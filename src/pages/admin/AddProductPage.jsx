import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useContext, useState, useCallback } from "react";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { fireDB } from "../../firebase/FirebaseConfig";
import { useNavigate } from "react-router";
import Loader from "../../components/loader/Loader";
import { ReactSortable } from "react-sortablejs";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../firebase/FirebaseConfig";
import { v4 as uuidv4 } from "uuid";
import { IoMdCloseCircle } from "react-icons/io";

const categoryList = [
  {
    name: "fashion",
  },
  {
    name: "shirt",
  },
  {
    name: "jacket",
  },
  {
    name: "Bottles",
  },
  {
    name: "Shoes",
  },
  {
    name: "shoes",
  },
  {
    name: "home",
  },
  {
    name: "bags",
  },
];

const inputStyles =
  "bg-adminPrimary border text-text border-adminSecondary px-2 py-2 rounded-md outline-none placeholder-adminSecondary";

const AddProductPage = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;
  const [images, setImages] = useState([]);

  // navigate
  const navigate = useNavigate();

  // product state
  const [product, setProduct] = useState({
    title: "",
    price: "",
    productImageUrl: "",
    category: "",
    description: "",
    quantity: 1,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  // Add Product Function
  const addProductFunction = async () => {
    if (
      product.title == "" ||
      product.price == "" ||
      product.productImageUrl == "" ||
      product.category == "" ||
      product.description == ""
    ) {
      return toast.error("all fields are required");
    }

    setLoading(true);
    try {
      const productRef = collection(fireDB, "products");
      await addDoc(productRef, product);
      toast.success("Add product successfully");
      navigate("/admin-dashboard");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Add product failed");
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

    const imageUploadToast = toast.loading("Uploading image...");
    try {
      const imageRef = ref(storage, `products/${uuidv4()}`);
      const snapshot = await uploadBytes(imageRef, file);
      const url = await getDownloadURL(snapshot.ref);

      setImages((prev) => [...prev, url]);
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

  const updateImagesOrder = useCallback((newImagesOrder) => {
    setImages(newImagesOrder);
  }, []);

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
              onChange={(e) => {
                setProduct({
                  ...product,
                  category: e.target.value,
                });
              }}
              className={`${inputStyles}  w-full h-full`}
            >
              <option disabled>Select Product Category</option>
              {categoryList.map((value, index) => {
                const { name } = value;
                return (
                  <option
                    className=" first-letter:uppercase"
                    key={index}
                    value={name}
                  >
                    {name}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Input Four  */}
          <div className="basis-2/3">
            <input
              type="text"
              name="productImageUrl"
              value={product.productImageUrl}
              onChange={(e) => {
                setProduct({
                  ...product,
                  productImageUrl: e.target.value,
                });
              }}
              placeholder="Product Image Url"
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
              rows="10"
              className={`${inputStyles}  w-full`}
            ></textarea>
          </div>
          <div className="basis-1/2 mb-2 bg-adminPrimary border text-text border-adminSecondary px-2 py-2 rounded-md w-full">
            <div className="w-full h-full flex flex-col gap-1">
              <label className="text-text font-semibold">Photos</label>
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
                        className="h-24 w-32 bg-white shadow-sm rounded-xl border border-gray-200 relative overflow-hidden"
                      >
                        <img
                          src={link}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                </ReactSortable>
                <label className="w-24 h-24 cursor-pointer text-center flex items-center justify-center text-sm gap-1 text-primary rounded-lg bg-white shadow-sm border border-primary hover:bg-gray-300">
                  <input
                    type="file"
                    onChange={handleUploadImages}
                    className="hidden"
                  />
                  Upload
                </label>
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
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
