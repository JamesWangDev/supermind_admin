import React from "react";
import { Input, Label } from "reactstrap";
import AttachmentsDropdown from "./AttachmentDropdown";
import NoDataFound from "../CommonComponent/NoDataFound";
import Image from "next/image";

const MediaData = ({ state, dispatch, attachmentsData, refetch }) => {
    // Deleting the selected images from media module
    const ChoseImages = (e, item) => {
        let temp = [...state.deleteImage];
        if (temp?.includes(item.id) && !e.target.checked) {
            temp.splice(temp.indexOf(item.id), 1);
            dispatch({ type: "DeleteSelectedImage", payload: temp });
        }
        if (e.target.checked) {
            dispatch({ type: "DeleteSelectedImage", payload: [...state.deleteImage, item.id] });
        }
    };
    return (
        <>
            {attachmentsData?.length > 0 ? attachmentsData?.map((elem, i) => (
                <div key={i}>
                    <div className="library-box">
                        <Input type="checkbox" id={elem.id} checked={state.deleteImage?.includes(elem.id)} onChange={(e) => ChoseImages(e, elem)} />
                        <Label htmlFor={elem.id}>
                            <div className="ratio ratio-1x1">
                                <Image src={elem.original_url} className="img-fluid" alt="ratio image" height={130} width={130} />
                            </div>
                            <AttachmentsDropdown state={state} dispatch={dispatch} id={elem?.id} refetch={refetch} />
                        </Label>
                    </div>
                </div>
            ))
                : <NoDataFound title={"NoMediaFound"} />}
        </>
    );
};

export default MediaData;