import SimpleInputField from "../InputFields/SimpleInputField";

const SeoTab = () => {
  return (
    <>
      <SimpleInputField
        nameList={[
          { name: "[values][seo][meta_title]", title: "meta_title", placeholder: "Enter meta_title" },
          { name: "[values][seo][meta_description]", title: "meta_description", placeholder: "Enter meta_description" },
          { name: "[values][seo][meta_tags]", title: "meta_tags", placeholder: "Enter meta_tags" },
          { name: "[values][seo][og_title]", title: "og_title", placeholder: "Enter og_title" },
          { name: "[values][seo][og_description]", title: "og_description", placeholder: "Enter og_description" },
        ]}
      />
    </>
  );
};

export default SeoTab;
