import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useContext, useState, useCallback } from "react";
import myContext from "../../../context/myContext";
import toast from "react-hot-toast";
import { fireDB, storage } from "../../../firebase/FirebaseConfig";
import { useNavigate } from "react-router";
import Loader from "../../../components/loader/Loader";
import { ReactSortable } from "react-sortablejs";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { IoMdCloseCircle } from "react-icons/io";
import { FaCircle } from "react-icons/fa6";

const inputStyles =
  "bg-adminPrimary border text-text border-adminSecondary px-2 py-2 rounded-md outline-none placeholder-adminSecondary";

const AddProductPage = () => {
  const context = useContext(myContext);
  const { loading, setLoading, getAllCategory } = context;
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [colorInput, setColorInput] = useState("");
  const [hexInput, setHexInput] = useState("#000000");
  const [sizeInput, setSizeInput] = useState([]);
  const [deliveryOption, setDeliveryOption] = useState("");
  const [deliveryCost, setDeliveryCost] = useState(0);

  // navigate
  const navigate = useNavigate();

  // product state
  const [product, setProduct] = useState({
    title: "",
    price: "",
    productVideoUrl: "",
    images: [],
    category: "",
    description: "",
    quantity: 1,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
    colors: [], // Array of {name, hex}
    sizes: [],
    delivery: {},
  });

  // Function to resize the image to 200x200 pixels
  const resizeImage = (file, maxWidth, maxHeight) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const canvas = document.createElement("canvas");
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target.result;

        img.onload = () => {
          const ctx = canvas.getContext("2d");
          let width = img.width;
          let height = img.height;

          // Calculate new dimensions
          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height *= maxWidth / width));
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width *= maxHeight / height));
              height = maxHeight;
            }
          }

          // Set canvas dimensions
          canvas.width = width;
          canvas.height = height;

          // Draw image in the canvas
          ctx.drawImage(img, 0, 0, width, height);

          // Convert canvas to Blob
          canvas.toBlob((blob) => {
            resolve(blob);
          }, file.type || "image/jpeg"); // Convert the image to JPEG
        };
      };

      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  // Add Product Function
  const addProductFunction = async () => {
    if (loading || isUploading) {
      toast.error("Please wait for the current operation to complete");
      return;
    }

    if (
      product.title === "" ||
      product.price === "" ||
      product.productVideoUrl === "" ||
      product.category === "" ||
      product.description === ""
    ) {
      return toast.error(
        "All fields are required. Please fill in all the fields"
      );
    }

    setLoading(true);

    // process delivery details
    handelDeliveryDetails();

    try {
      const productRef = collection(fireDB, "products");
      await addDoc(productRef, product);
      toast.success("Product added successfully");
      navigate("/hk-admin/products");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Failed to add product");
    }
  };

  const handleUploadImages = async (event) => {
    if (isUploading) return;
    if (images.length >= 5) {
      toast.error("Cannot upload more than 5 images");
      return;
    }

    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const resizedImageBlob = await resizeImage(file, 1200, 800);
      const imageRef = ref(storage, `products/${uuidv4()}`);
      const snapshot = await uploadBytes(imageRef, resizedImageBlob);
      const url = await getDownloadURL(snapshot.ref);

      setProduct((prevProduct) => ({
        ...prevProduct,
        images: [...prevProduct.images, url],
      }));
      setImages((prev) => [...prev, url]);
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image", error);
    }
    setIsUploading(false);
  };

  const updateImagesOrder = useCallback((newImagesOrder) => {
    setImages(newImagesOrder);
  }, []);

  // Process Delivery Details
  const handelDeliveryDetails = () => {
    if (deliveryOption.match("Free")) {
      setDeliveryCost(0);
    }

    setProduct((prevProduct) => ({
      ...prevProduct,
      delivery: { option: deliveryOption, cost: deliveryCost },
    }));
  };

  // Add color (name and hex) to the product's color array
  const handleAddColor = () => {
    if (colorInput.trim() === "" || hexInput.trim() === "") {
      return toast.error("Please enter a color name and choose a color");
    }

    setProduct((prevProduct) => ({
      ...prevProduct,
      colors: [...prevProduct.colors, { name: colorInput, hex: hexInput }],
    }));

    setColorInput(""); // Clear the input field
    setHexInput("#000000"); // Reset hex input to default
  };

  // Remove a color by index
  const handleRemoveColor = (index) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      colors: prevProduct.colors.filter((_, i) => i !== index),
    }));
  };

  // Add size to the product's size array
  const handleAddSize = () => {
    if (sizeInput.trim() === "") {
      return toast.error("Please enter a size");
    }

    setProduct((prevProduct) => ({
      ...prevProduct,
      sizes: [...prevProduct.sizes, sizeInput],
    }));

    setSizeInput(""); // Clear the input field
  };

  // Remove a size by index
  const handleRemoveSize = (index) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      sizes: prevProduct.sizes.filter((_, i) => i !== index),
    }));
  };

  return (
    <div>
      {loading && (
        <div className="flex flex-col justify-center items-start h-full">
          <Loader />
        </div>
      )}

      <div className="flex flex-col gap-6">
        <div className="flex flex-row gap-4">
          {/* Input One  */}
          <div className="basis-2/3">
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={(e) => {
                setProduct({
                  ...product,
                  title: e.target.value,
                });
              }}
              placeholder="Product Title"
              className={`${inputStyles}  w-full`}
            />
          </div>

          {/* Input Two  */}
          <div className="basis-1/3">
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={(e) => {
                setProduct({
                  ...product,
                  price: e.target.value,
                });
              }}
              placeholder="Product Price"
              className={`${inputStyles}  w-full`}
            />
          </div>
        </div>

        <div className="flex flex-row gap-4">
          {/* Input Three  */}
          <div className="basis-1/3">
            <select
              value={product.category}
              title="Select Product Category"
              onChange={(e) => {
                setProduct({
                  ...product,
                  category: e.target.value,
                });
              }}
              className={`${inputStyles}  w-full h-full`}
            >
              <option selected>Uncategorized</option>
              {getAllCategory.map((value, index) => {
                const { categoryName, id, parentCategory } = value;
                return (
                  <option
                    className=" first-letter:uppercase"
                    key={index}
                    value={id}
                  >
                    {parentCategory
                      ? parentCategory + " / " + categoryName
                      : categoryName}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Input Four  */}
          <div className="basis-2/3">
            <input
              type="text"
              name="productVideoUrl"
              value={product.productVideoUrl}
              onChange={(e) => {
                setProduct({
                  ...product,
                  productVideoUrl: e.target.value,
                });
              }}
              placeholder="Product Video Link"
              className={`${inputStyles}  w-full`}
            />
          </div>
        </div>

        <div className="flex flex-row gap-4 h-fit">
          {/* Input Five  */}
          <div className="basis-1/2 h-fit">
            <textarea
              value={product.description}
              onChange={(e) => {
                setProduct({
                  ...product,
                  description: e.target.value,
                });
              }}
              name="description"
              placeholder="Product Description"
              rows="5"
              className={`${inputStyles}  w-full`}
            ></textarea>
          </div>
          <div className="basis-1/2 mb-2 bg-adminPrimary border text-text border-adminSecondary px-2 py-2 rounded-md w-full">
            <div className="w-full h-full flex flex-col gap-1">
              <label className="text-text font-semibold">
                Photos ({images.length} of 5)
              </label>
              <div className="mb-2 flex flex-wrap gap-1">
                <ReactSortable
                  list={images || []}
                  className="flex flex-wrap gap-3 mr-2"
                  setList={updateImagesOrder}
                >
                  {!!images.length &&
                    images.map((link) => (
                      <div
                        key={link}
                        className="w-28 h-20  bg-white shadow-sm rounded-lg border border-gray-200 relative overflow-hidden"
                      >
                        <img
                          src={link}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                </ReactSortable>
                {isUploading && (
                  <div className="w-28 h-20  bg-background p-1 text-center flex rounded-lg items-center justify-center border-primary">
                    <Loader />
                  </div>
                )}
                {!isUploading && images.length < 5 && (
                  <label className="w-28 h-20 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-lg bg-white shadow-sm border border-primary hover:bg-background">
                    <input
                      type="file"
                      onChange={handleUploadImages}
                      className="hidden"
                    />
                    <div>Upload</div>
                    <div className="text-xs">(1200px x 800px)</div>
                  </label>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-4 h-fit -mt-4">
          <div className="basis-1/2 mb-4">
            {/* Display the list of colors */}
            <div className="flex flex-wrap gap-2 mt-2">
              <label className="text-adminPrimary align-middle font-semibold ">
                Colors :{" "}
              </label>
              {product.colors.map((color, index) => (
                <div
                  key={index}
                  className="bg-gray-300 border border-adminSecondary px-3 py-1 rounded-lg flex items-center gap-2"
                >
                  <span style={{ color: color.hex }}>
                    <FaCircle />
                  </span>
                  {color.name}
                  <button
                    onClick={() => handleRemoveColor(index)}
                    className="text-red-500"
                  >
                    <IoMdCloseCircle />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex flex-row items-center gap-2 mt-2">
              <input
                type="text"
                placeholder="Enter a color name"
                value={colorInput}
                onChange={(e) => setColorInput(e.target.value)}
                className={`${inputStyles} w-full basis-2/5`}
              />
              <input
                type="color"
                className="w-full basis-2/5 h-[2.6rem] bg-background border text-text border-adminSecondary p-1 rounded-md outline-none placeholder-adminSecondary"
                value={hexInput}
                onChange={(e) => setHexInput(e.target.value)}
                title="Choose your color"
              />
              <button
                type="button"
                onClick={handleAddColor}
                className="bg-adminSecondary hover:bg-adminAccent text-white px-1 py-2 rounded-md w-full basis-1/5"
              >
                Add Color
              </button>
            </div>
          </div>

          <div className="basis-1/2 mb-4">
            {/* Display the list of sizes */}
            <div className="flex flex-wrap gap-2 mt-2">
              <label className="text-adminPrimary align-middle font-semibold ">
                Sizes :{" "}
              </label>
              {product.sizes.map((size, index) => (
                <div
                  key={index}
                  className="bg-gray-200 px-3 py-1 rounded-lg flex items-center gap-2"
                >
                  <span>{size}</span>
                  <button
                    onClick={() => handleRemoveSize(index)}
                    className="text-red-500"
                  >
                    <IoMdCloseCircle />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <input
                type="text"
                placeholder="Enter a Size"
                value={sizeInput}
                onChange={(e) => setSizeInput(e.target.value)}
                className={`${inputStyles} w-full`}
              />
              <button
                type="button"
                onClick={handleAddSize}
                className="bg-adminSecondary hover:bg-adminAccent text-white px-1 py-2 rounded-md w-full basis-1/5"
              >
                Add Size
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-4 h-fit">
          <div className={`${inputStyles} mb-4 w-full h-fit basis-1/2`}>
            <div className="flex flex-row gap-6">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="delivery"
                  value="free"
                  checked={deliveryOption === "free"}
                  onChange={() => setDeliveryOption("free")}
                  className="m-2"
                />
                <label className="text-text">Free Delivery</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="delivery"
                  value="paid"
                  checked={deliveryOption === "paid"}
                  onChange={() => setDeliveryOption("paid")}
                  className="mr-2"
                />
                <label className="text-text">Paid Delivery</label>
                {deliveryOption === "paid" && (
                  <input
                    type="number"
                    value={deliveryCost}
                    onChange={(e) => setDeliveryCost(e.target.value)}
                    className={
                      "w-32 text-text bg-white rounded-md px-2 py-0.5 outline-none"
                    }
                    placeholder="Cost"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Add Product Button  */}
        <div className="mb-3">
          <button
            onClick={addProductFunction}
            type="button"
            className="bg-primary hover:bg-accent w-full text-white text-center py-3 px-4 font-bold rounded-md "
            disabled={loading}
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
