import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useContext, useState } from "react";
import myContext from "../../../context/myContext";
import toast from "react-hot-toast";
import { fireDB, storage } from "../../../firebase/FirebaseConfig";
import { useNavigate } from "react-router";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const inputStyles =
  "bg-adminPrimary border text-text border-adminSecondary px-2 py-2 rounded-md outline-none placeholder-adminSecondary";

const AddCategory = () => {
  const context = useContext(myContext);
  const { getAllCategory, getAllCategoryFunction, loading, setLoading } =
    context;
  const [categoryName, setCategoryName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [noImage, setNoImage] = useState(false);

  const navigate = useNavigate();

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

  const addCategoryFunction = async () => {
    if (loading) {
      toast.error("Please wait for the current operation to complete");
      return;
    }

    if (categoryName === "") {
      return toast.error(
        "All fields are required. Please fill in all the fields"
      );
    }

    if (!categoryImage) {
      setNoImage(true);
    }

    setLoading(true);
    try {
      if (noImage) {
        const resizedImageBlob = await resizeImage(categoryImage, 200, 200);

        // Create a unique file name for the image
        const imageRef = ref(
          storage,
          `categories/${categoryImage.name + uuidv4()}`
        );

        // Upload resized image as a blob
        await uploadBytes(imageRef, resizedImageBlob);
        const imageUrl = await getDownloadURL(imageRef);
      }

      const categoryRef = collection(fireDB, "categories");

      await addDoc(categoryRef, {
        categoryName,
        parentCategory,
        categoryImage: imageUrl || "No Image",
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      });

      toast.success("Category added successfully");
      setCategoryName("");
      setParentCategory("");
      setCategoryImage(null);
      setNoImage(false);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("Failed to add category");
    }
  };

  return (
    <div className="container mx-auto py-12 text-adminText">
      <h1 className="text-3xl font-bold">Add Category</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addCategoryFunction();
        }}
      >
        <div className="flex flex-col my-4">
          <label htmlFor="categoryName" className="text-lg font-semibold mb-2">
            Category Name
          </label>
          <input
            type="text"
            id="categoryName"
            className={`${inputStyles}  w-full h-full`}
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>
        <div className="flex flex-col my-4">
          <label
            htmlFor="parentCategory"
            className="text-lg font-semibold mb-2"
          >
            Parent Category
          </label>

          <select
            value={parentCategory}
            onChange={(e) => setParentCategory(e.target.value)}
            className={`${inputStyles}  w-full h-full`}
            placeholder="Select Parent Category"
          >
            <option value="" selected>
              {""}
            </option>
            {getAllCategory.map((value, index) => {
              const { categoryName } = value;
              return (
                <option
                  className=" first-letter:uppercase"
                  key={index}
                  value={categoryName}
                >
                  {categoryName}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-col my-4">
          <label htmlFor="categoryImage" className="text-lg font-semibold mb-2">
            Category Image
          </label>
          <input
            type="file"
            id="categoryImage"
            className="border p-2 rounded-md"
            onChange={(e) => setCategoryImage(e.target.files[0])}
          />
        </div>
        <button
          type="submit"
          className="bg-primary hover:bg-accent w-full text-white text-center py-3 px-4 font-bold rounded-md "
        >
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
