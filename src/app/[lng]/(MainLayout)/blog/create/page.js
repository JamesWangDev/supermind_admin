'use client'
import BlogForm from "@/Components/Blog/BlogForm";
import { blog } from "@/Utils/AxiosUtils/API";
import FormWrapper from "@/Utils/HOC/FormWrapper";
import useCreate from "@/Utils/Hooks/useCreate";

const AddBlog = () => {
  const { mutate, isLoading } = useCreate(blog, false, "/blog");
  return (
    <FormWrapper title="AddBlog">
      <BlogForm mutate={mutate} loading={isLoading} />
    </FormWrapper>
  );
};

export default AddBlog;
