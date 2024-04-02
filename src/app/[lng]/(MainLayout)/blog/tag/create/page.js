'use client'
import TagForm from "@/Components/Tag/TagForm";
import { tag } from "@/Utils/AxiosUtils/API";
import FormWrapper from "@/Utils/HOC/FormWrapper";
import useCreate from "@/Utils/Hooks/useCreate";

const TagsCreate = () => {
  const { mutate, isLoading } = useCreate(tag, false, "/blog/tag");
  return (
    <FormWrapper title="AddTag">
      <TagForm loading={isLoading} mutate={mutate} type={"post"} />
    </FormWrapper>
  );
};

export default TagsCreate;
