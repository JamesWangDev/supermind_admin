import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiPencilLine } from "react-icons/ri";
import NoSsr from "../../Utils/HOC/NoSsr";
import usePermissionCheck from "../../Utils/Hooks/usePermissionCheck";
import DeleteButton from "./DeleteButton";
import ViewDetails from "./ViewDetails";
import { useContext, useState } from "react";
import AnswerModal from "../Q&A/AnswerModal";
import I18NextContext from "@/Helper/I18NextContext";

const Options = ({ fullObj, mutate, type, moduleName, optionPermission, refetch, keyInPermission }) => {
  const pathname = usePathname();
  const [modal, setModal] = useState(false)
  const { i18Lang } = useContext(I18NextContext);
  const [edit, destroy] = usePermissionCheck(["edit", "destroy"], keyInPermission ?? keyInPermission);
  return (
    <div className="custom-ul">
      <NoSsr>
        {optionPermission?.optionHead.type == "View" ? (
          <ViewDetails fullObj={fullObj} tableData={optionPermission?.optionHead} refetch={refetch} />
        ) : (
          <>
            <div>
              {keyInPermission == 'question_and_answer' && edit
                ? <a onClick={() => setModal(true)}><RiPencilLine /></a>
                : edit && fullObj?.id && !optionPermission?.noEdit && (
                  <>
                    {
                      optionPermission?.editRedirect ?
                        <Link href={"/" + optionPermission?.editRedirect + "/update/" + fullObj.id}>
                          <RiPencilLine />
                        </Link> :
                        type == "post" && moduleName?.toLowerCase() == "tag" ?
                          <Link href={`/${pathname.split("/")[1]}/tag/update/${fullObj.id}`}>
                            <RiPencilLine />
                          </Link> :
                          type == "post" ?
                            <Link href={`/${i18Lang}/${pathname.split("/")[2]}/category/update/${fullObj.id}`}>
                              <RiPencilLine />
                            </Link>
                            :
                            <Link href={`/${i18Lang}/${pathname.split("/")[2]}/update/${fullObj.id}`}>
                              <RiPencilLine />
                            </Link>
                    }
                  </>
                )}
            </div>
            <div>
              {destroy && !optionPermission?.noDelete && (
                <DeleteButton
                  id={fullObj?.id}
                  mutate={mutate}
                />
              )}
            </div>
          </>
        )}
        {modal && <AnswerModal fullObj={fullObj} modal={modal} setModal={setModal} />}
      </NoSsr>
    </div>
  );
};

export default Options;
