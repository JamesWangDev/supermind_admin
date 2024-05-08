import React from "react";
import { useRouter } from "next/navigation";
import Options from "../Table/Options";

const TreeLine = ({ data, level, active, setActive, type, mutate, loading, activeColored }) => {
  const router = useRouter();

  if (!data) return null;
  return (
    <ul>
      {data.map((item, i) => {
        return <li key={i} className={item.subcategories.length ? "inside-ul" : ""} style={{ color: ((activeColored && active.includes(item.id)) || router?.query?.updateId == item.id) ? "#0da487" : "" }}>
          <div className={`${item.status == 0 ? "disabled" : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              if (item.subcategories) {
                let temp = active;
                active.includes(item.id) ? temp.splice(active.indexOf(item.id), 1) : (temp = [...active, item.id]);
                setActive([...temp]);
              }
            }}>
            <i className="tree-icon file-icon" role="presentation"></i>
            {item.name}
            {!activeColored && <div className="tree-options">
              <Options fullObj={item} mutate={mutate} type={type} loading={loading} keyInPermission={"category"} />
            </div>}
          </div>
          {item.subcategories && (
            <div className={active.includes(item.id) ? "d-block" : "d-none"}>
              <TreeLine activeColored={activeColored} data={item.subcategories} level={level + 1} active={active} setActive={setActive} mutate={mutate} type={type} />
            </div>
          )}
        </li>
      })
      }
    </ul >
  );
};

export default TreeLine;
