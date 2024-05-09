import TreeLine from '@/Components/category/TreeLine';
import { useState, useEffect, useContext } from 'react';
import { useTranslation } from "@/app/i18n/client";
import I18NextContext from "@/Helper/I18NextContext";
import { useDebouncedCallback } from 'use-debounce';  
import { useQuery, useMutation } from '@tanstack/react-query';
import { ACTION_CATEGORIES } from '@/Utils/ActionCategories';
import { Spinner, Modal, ModalHeader, ModalBody, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Badge } from 'reactstrap';
import Btn from "@/Elements/Buttons/Btn";

const ActionCategoryComp = ({ name="Actions", getSelectedActions }) => {
    const [hideActionsTree, setHideActionsTree] = useState(true);
    const [actions, setActions] = useState([])
    const [searchAction, setSearchAction] = useState("")
    const [refetch, setRefetch] = useState(false)
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const [openModel, setOpenModel] = useState(false);
    const [actionDetail, setActionDetail] = useState(null);
    const [actionDescription, setActionDescription] = useState("")
    const [actionCategories, setActionCategories] = useState([])
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const {mutate: updateDescriptionMutate, isLoading: updateDescriptionLoading} = useMutation(async ({description, name, categories, id}) => {
        const resp = await fetch("https://nodeapi.supermind.bot/nodeapi/updateNodeDescription", {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            },

            body: JSON.stringify({description, name, categories, id})
        })
        const respJson = await resp.json()
        if(respJson.success) {
            alert("Action updated")
            return
        }
        throw respJson.message
    }, { refetchOnWindowFocus: false, select: (data) => data.data });

    const {mutate: deleteDescriptionMutate, isLoading: deleteDescriptionLoading} = useMutation(async ({workflowId}) => {
        const resp = await fetch(`https://nodeapi.supermind.bot/nodeapi/deleteWorkflow?workflowId=${workflowId}`, {
            method: "DELETE",
            headers: {
            "Content-Type": "application/json",
            },
        })
        const respJson = await resp.json()
        if(respJson.success) {
            setRefetch(prev => !prev)
            setOpenModel(false)
            return
        }
        throw respJson.message
    }, { refetchOnWindowFocus: false, select: (data) => data.data });

    const { error, data: actionsInfo, isLoading } = useQuery(["actions", refetch], async () => {
        const resp = await fetch(`https://nodeapi.supermind.bot/nodeapi/getDescriptions?paginate=10000&page=1&sort=asc&search=${searchAction}`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
        })
        const respJson = await resp.json()
        if(respJson.success) return respJson
        throw respJson.message
    }, { refetchOnWindowFocus: false, select: (data) => data });

    useEffect(() => {
        if(getSelectedActions) {
            getSelectedActions(actions)
        }
        else {
            const categoryActions = actions.filter((action) => ACTION_CATEGORIES.includes(action))
            if(actions.length){
                const action = actionsInfo?.data.find((d) => actions.includes(d.id))
                if(action){
                    viewActionDetail(action)
                    setActions(categoryActions)
                }
            }
        }
    }, [actions])

    const refetchActions = useDebouncedCallback(async () => {
        setRefetch(prev => !prev)
    }, 2000)

    const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

    const viewActionDetail = (data, find) => {
        if(find) {
            data = actionsInfo?.data.find((d) => actions.includes(d.id))
        }
        setActionDetail(data);
        setActionDescription(data?.description)
        setActionCategories(data?.categories ?? [])
        setOpenModel(true);
    };
    
    const toggleModal = () => setOpenModel((prev) => !prev);
    
    if (isLoading) return <Spinner />;

    return (
      <>
        <div style={{display: "flex", justifyContent: "center", marginBottom: 10}}>
            <input placeholder="Search Actions" type="text" value={searchAction} onChange={(e) => {
                setSearchAction(e.currentTarget.value)
                refetchActions()
            }} />
        </div>
        <div className="theme-tree-box" style={{display: "flex", justifyContent: "center", marginBottom: 10, padding: 0}}>
            <ul className="tree-main-ul" style={{padding: 0}}>
            <li>
                <div onClick={() => setHideActionsTree(prev => !prev)}>
                <i className="tree-icon folder-icon cursor" role="presentation"></i>
                {t(name)}
                </div>
                {actionsInfo?.categorizedData && !hideActionsTree && <TreeLine activeColored viewDetail={getSelectedActions ? viewActionDetail : null} level={0} active={actions} setActive={setActions} data={Object.entries(actionsInfo.categorizedData).map(([key, value]) => ({name: key, id: key, subcategories: value.map(({name, id}) => ({id, name, subcategories: []}))}))} />}
            </li>
            </ul>
        </div>
        <Modal fullscreen isOpen={openModel} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>{actionDetail?.name}</ModalHeader>
        <ModalBody>
          <div>
            Categories:
            <div>
              {actionCategories.map((cat, i) => <Badge style={{cursor: "pointer"}} pill key={i} color="primary"  onClick={() => setActionCategories((prevCategories) => prevCategories.filter((prevCat) => prevCat !== cat))}>
                {cat}
              </Badge>)}
            </div>
          </div>
          <Dropdown style={{margin: 10}} isOpen={dropdownOpen} toggle={toggleDropdown}>
            <DropdownToggle caret>Select Categories</DropdownToggle>
            <DropdownMenu>
              {
                ACTION_CATEGORIES.map((cat, i) => <DropdownItem style={{backgroundColor: actionCategories.includes(cat) ? "greenyellow" : "transparent"}} key={i} onClick={()=> {
                  setActionCategories((prevCategories) => {
                    if(actionCategories.includes(cat)){
                      return prevCategories.filter((prevCat) => prevCat !== cat)
                    } else {
                      return [...prevCategories, cat]
                    }
                  })
                }}>{cat}</DropdownItem>)
              }
            </DropdownMenu>
          </Dropdown>
          <textarea style={{width:"100%", height: "100%"}} value={actionDescription} onChange={(e) => setActionDescription(e.target.value)} />
          <div style={{marginBottom: 10, display: "flex", justifyContent: "space-around"}}>
            <Btn
              title="Update Action"
              className="align-items-center btn-theme add-button"
              loading={updateDescriptionLoading || deleteDescriptionLoading}
              onClick={() => updateDescriptionMutate({description: actionDescription, name: actionDetail?.name, categories: actionCategories, id: actionDetail?.id})}
            />
            <Btn
              title="Delete Action"
              className="align-items-center"
              loading={updateDescriptionLoading || deleteDescriptionLoading}
              onClick={() => deleteDescriptionMutate({workflowId: actionDetail?.workflow_id})}
            />
          </div>
        </ModalBody>
      </Modal>
      </>
    );
}

export default ActionCategoryComp