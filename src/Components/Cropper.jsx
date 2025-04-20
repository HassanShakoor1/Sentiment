import { Box, Modal } from "@mui/material";
import React from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const Cropper = ({
  cropModal,
  handleclosecropper,
  theimg,
  myimg,
  setmyimg,
  setcrop,
  crop,
  aspect,
  setReduxState,
  isCircle,
  handleFormSubmit,
}) => {
  // const getProfileCropImage = async () => {
  //   const canvas = document.createElement("canvas");
  //   const scaleX = myimg.naturalWidth / myimg.width;
  //   const scaleY = myimg.naturalHeight / myimg.height;
  //   canvas.width = crop.width;
  //   canvas.height = crop.height;
  //   const ctx = canvas.getContext("2d");

  //   const pixelRatio = window.devicePixelRatio;
  //   canvas.width = crop.width * pixelRatio;
  //   canvas.height = crop.height * pixelRatio;
  //   ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  //   ctx.imageSmoothingQuality = "high";

  //   ctx.drawImage(
  //     myimg,
  //     crop.x * scaleX,
  //     crop.y * scaleY,
  //     crop.width * scaleX,
  //     crop.height * scaleY,
  //     0,
  //     0,
  //     crop.width,
  //     crop.height
  //   );

  //   const base64Image = canvas.toDataURL("image/jpeg");

  //   setReduxState(base64Image);

  //   handleFormSubmit();
  //   handleclosecropper();
  // };

  // const getProfileCropImage = async () => {
  //   handleFormSubmit();ok

  //   const canvas = document.createElement("canvas");
  //   const scaleX = myimg.naturalWidth / myimg.width;
  //   const scaleY = myimg.naturalHeight / myimg.height;
  //   canvas.width = crop.width;
  //   canvas.height = crop.height;
  //   const ctx = canvas.getContext("2d");
  //   const pixelRatio = window.devicePixelRatio;

  //   canvas.width = crop.width * pixelRatio;
  //   canvas.height = crop.height * pixelRatio;

  //   ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  //   ctx.imageSmoothingQuality = "high";

  //   ctx.drawImage(
  //     myimg,
  //     crop.x * scaleX,
  //     crop.y * scaleY,
  //     crop.width * scaleX,
  //     crop.height * scaleY,
  //     0,
  //     0,
  //     canvas.width,
  //     canvas.height
  //   );

  //   canvas.toBlob(
  //     (blob) => {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(blob);
  //       reader.onloadend = () => {
  //         const base64Image = reader.result;
  //         setReduxState(base64Image);
  //         handleclosecropper();
  //       };
  //     },
  //     "image/jpeg",
  //     1
  //   );
  // };

  const getProfileCropImage = async () => {
    handleFormSubmit();

    const canvas = document.createElement("canvas");
    const scaleX = myimg.naturalWidth / myimg.width;
    const scaleY = myimg.naturalHeight / myimg.height;
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;
    const ctx = canvas.getContext("2d");

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      myimg,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      canvas.width / pixelRatio,
      canvas.height / pixelRatio
    );

    canvas.toBlob(
      (blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const base64Image = reader.result;
          setReduxState(base64Image);
          handleclosecropper();
        };
      },
      "image/jpeg",
      1
    );
  };

  const style2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 30,
    width: "300px",
  };

  return (
    <>
      <Modal
        open={cropModal}
        onClose={handleclosecropper}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <ReactCrop
            crop={crop}
            onChange={(c) => setcrop(c)}
            circularCrop={isCircle}
            aspect={aspect}
            style={{ maxHeight: "450px" }}
          >
            <img src={theimg} alt="img" onLoad={(e) => setmyimg(e.target)} />
          </ReactCrop>
          <div
            style={{
              width: "50%",
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <button
              onClick={handleclosecropper}
              style={{
                backgroundColor: "white",
                outline: "none",
                marginRight: "10px",
                border: "none",
                color: "black",
                height: "40px",
                width: "105px",
                borderRadius: "20px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              onClick={getProfileCropImage}
              style={{
                backgroundColor: "black",
                outline: "none",
                marginLeft: "10px",
                border: "none",
                color: "white",
                height: "40px",
                width: "105px",
                borderRadius: "20px",
                cursor: "pointer",
              }}
            >
              Crop
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Cropper;
