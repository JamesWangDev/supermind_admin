import TreeLine from '@/Components/category/TreeLine';
import { useState, useEffect, useContext } from 'react';
import { useTranslation } from "@/app/i18n/client";
import I18NextContext from "@/Helper/I18NextContext";
import { useDebouncedCallback } from 'use-debounce';  
import { useQuery } from '@tanstack/react-query';
import { ACTION_CATEGORIES } from '@/Utils/ActionCategories';
import { Spinner } from 'reactstrap';

const ActionCategoryComp = ({ name="Actions", viewActionDetail, getSelectedActions }) => {
    const [hideActionsTree, setHideActionsTree] = useState(true);
    const [actions, setActions] = useState([])
    const [searchAction, setSearchAction] = useState("")
    const [refetch, setRefetch] = useState(false)
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
  
    const { error, data: actionsInfo, isLoading } = useQuery(["actions", refetch], async () => {
        const resp = await fetch(`http://134.209.37.239/nodeapi/getDescriptions?paginate=10000&page=1&sort=asc&search=${searchAction}`, {
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
        if(viewActionDetail){
            const categoryActions = actions.filter((action) => ACTION_CATEGORIES.includes(action))
            if(actions.length){
                const action = actionsInfo?.data.find((d) => actions.includes(d.id))
                if(action){
                    viewActionDetail(action)
                    setActions(categoryActions)
                }
            }
        } else if(getSelectedActions) {
            getSelectedActions(actions)
        }
    }, [actions])

    const refetchActions = useDebouncedCallback(async () => {
        setRefetch(prev => !prev)
    }, 2000)

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
                {actionsInfo?.categorizedData && !hideActionsTree && <TreeLine activeColored level={0} active={actions} setActive={setActions} data={Object.entries(actionsInfo.categorizedData).map(([key, value]) => ({name: key, id: key, subcategories: value.map(({name, id}) => ({id, name, subcategories: []}))}))} />}
            </li>
            </ul>
        </div>
      </>
    );
}

export default ActionCategoryComp