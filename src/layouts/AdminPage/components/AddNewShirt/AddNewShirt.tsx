import { useRef, useState } from "react";
import { Dropdown } from "../../../Utils/Dropdown/Dropdown";
import "./AddNewShirt.css";
import { ShirtModel } from "../../../../model/ShirtModel";
import { useAuth0 } from "@auth0/auth0-react";

export const AddNewShirt = () => {
  const [shirt, setShirt] = useState(new ShirtModel(0, "", "", 0, 1, "Color", "", ""));

  const [displayWarning, setDisplayWarning] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);

  const auth0 = useAuth0();
  const imageInput = useRef<HTMLInputElement>(null);

  const changeShirt = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setShirt({ ...shirt, [name]: value });
  }

  const setColor = (item: string) => {
    setShirt({ ...shirt, color: item });
  }

  const changeShirtImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const base64 = await convertImageToBase64(e.target.files![0]);
    setShirt({ ...shirt, img: base64 });
  }

  const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.addEventListener("load", (e) => {
        resolve(fileReader.result as string);
      });

      fileReader.addEventListener("error", (err) => {
        reject(err);
      });

      fileReader.readAsDataURL(file);
    });
  };

  const addShirt = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!shirt.title || !shirt.brand || shirt.color === "Color" || !shirt.img) {
      setDisplayWarning(true);
    }

    const url = `${process.env.REACT_APP_API}/admin`;
    const accessToken = await auth0.getAccessTokenSilently();
    const idToken = await auth0.getIdTokenClaims();
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(shirt)
    };
    const response = await fetch(url, requestOptions);
    setDisplayWarning(false);
    setDisplaySuccess(true);
    setShirt(new ShirtModel(0, "", "", 0, 1, "Color", "", ""));
    imageInput.current!.value = "";
  }

  return (
    <div className="card" style={{ marginTop: "3rem", marginBottom: "3rem" }}>
      <div className="card-top">
        Add new shirt
      </div>
      {displaySuccess &&
        <div className="add-new-shirt-alert-success">
          Book Added Successfully
        </div>
      }
      {displayWarning &&
        <div className="add-new-shirt-alert-danger">
          All fields must be filled out
        </div>
      }
      <div className="add-new-shirt-middle">
        <form>
          <div className="add-new-shirt-row">
            <div className="add-new-shirt-title-col">
              <div className="add-new-shirt-title">Title</div>
              <input className="input" type="text" name="title" value={shirt.title} onChange={changeShirt} />
            </div>
            <div className="add-new-shirt-small-col">
              <div className="add-new-shirt-title">Brand</div>
              <input className="input" type="text" name="brand" value={shirt.brand} onChange={changeShirt} />
            </div>
            <div className="add-new-shirt-small-col">
              <div className="add-new-shirt-title">Color</div>
              <Dropdown selectedItem={shirt.color} setSelectedItem={setColor} items={["BLACK", "WHITE", "BLUE", "RED", "GREEN", "BEIGE", "GRAY", "BLACK_AND_WHITE", "MANY"]} />
            </div>
          </div>
          <div className="add-new-shirt-description-row">
            <div className="add-new-shirt-title">Description</div>
            <textarea className="input" rows={3} name="description" value={shirt.description} onChange={changeShirt}></textarea>
          </div>
          <div className="add-new-shirt-row">
            <div className="add-new-shirt-small-col">
              <div className="add-new-shirt-title">In stock</div>
              <input className="input" type="number" min={1} name="inStock" value={shirt.inStock} onChange={changeShirt} />
            </div>
            <div className="add-new-shirt-small-col">
              <div className="add-new-shirt-title">Price</div>
              <input className="input" type="number" min={0} name="price" value={shirt.price} onChange={changeShirt} />
            </div>
          </div>
          <div className="add-new-shirt-row2">
            <div className="add-new-shirt-title">Image</div>
            <input className="input" type="file" onChange={changeShirtImage} ref={imageInput} />
          </div>
          <div className="add-new-shirt-row2">
            <button className="btn" onClick={addShirt}>Add Shirt</button>
          </div>
        </form>
      </div>
    </div>
  );
};
