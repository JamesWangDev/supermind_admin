import { Form, Formik } from 'formik'
import { useContext, useState } from 'react'
import { RiDownload2Line, RiUpload2Line, RiUploadCloud2Line } from 'react-icons/ri'
import { TabContent, TabPane } from 'reactstrap'
import ShowModal from '../../Elements/Alerts&Modals/Modal'
import Btn from '../../Elements/Buttons/Btn'
import useCreate from '../../Utils/Hooks/useCreate'
import { YupObject, requiredSchema } from '../../Utils/Validation/ValidationSchemas'
import FileUploadBrowser from '../InputFields/FileUploadBrowser'
import I18NextContext from '@/Helper/I18NextContext'
import { useTranslation } from '@/app/i18n/client'

const ImportExport = ({ importExport, refetch, moduleName }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, "common");
    const [modal, setModal] = useState(false)
    const { mutate: exportMutate, isLoading: exportLoader } = useCreate(importExport.exportUrl, false, false, false, (resDta) => {
        if (resDta?.status == 200 || resDta?.status == 201) {
            const blob = new Blob([resDta?.data], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download =  `${moduleName.toLowerCase()}.csv`;
            link.click();
            window.URL.revokeObjectURL(url);
        }
    }, false, 'blob')
    const { mutate, isLoading } = useCreate(importExport?.importUrl, false, false,  `${moduleName} added successfully`, (resDta) => {
        if (resDta?.status == 200 || resDta?.status == 201) {
            refetch();
            setModal(false);
        }
    })
    return (
        <>
            <a className="btn-outline btn btn-secondary" onClick={() => setModal(true)}><RiUpload2Line />{t("Import")}</a>
            <a className="btn-outline btn btn-secondary" onClick={() => exportMutate()}><RiDownload2Line />{t("Export")}</a >

            <ShowModal open={modal} setModal={setModal} modalAttr={{ className: "media-modal modal-dialog modal-dialog-centered modal-xl" }} close={true} title={"InsertMedia"} noClass={true}
            >
                <TabContent>
                    <TabPane className={"fade active show"} id="select">
                        <div className="content-section drop-files-sec">
                            <div>
                                <RiUploadCloud2Line />
                                <Formik
                                    initialValues={{ [moduleName?.toLowerCase()]: "" }}
                                    validationSchema={YupObject({ [moduleName?.toLowerCase()]: requiredSchema })}
                                    onSubmit={(values, { resetForm }) => {
                                        let formData = new FormData();
                                        Object.values(values[moduleName.toLowerCase()]).forEach((el, i) => {
                                            formData.append(`${moduleName?.toLowerCase()}`, el);
                                        });
                                        mutate(formData);
                                    }}>
                                    {({ values, setFieldValue, errors }) => (
                                        <Form className="theme-form theme-form-2 mega-form">
                                            <div>
                                                <div className="dflex-wgap justify-content-center ms-auto save-back-button">
                                                    <h2>{t("Dropfilesherepaste")}
                                                        <span>{t("or")}</span>
                                                        <FileUploadBrowser errors={errors} id={moduleName.toLowerCase()} name={moduleName.toLowerCase()} type="file" multiple={true} values={values} setFieldValue={setFieldValue} accept=".csv" />
                                                    </h2>
                                                </div>
                                            </div>

                                            <div className="modal-footer">
                                                {values[moduleName.toLowerCase()] && values[moduleName.toLowerCase()]?.length > 0 &&
                                                    <a href="#javascript" onClick={() => setFieldValue(`${moduleName}`, "")}>{t("Clear")}</a>
                                                }
                                                <Btn type="submit" className="ms-auto" title="Insert Media" loading={Number(isLoading)} />
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </TabPane >
                </TabContent>
            </ShowModal >
        </>
    )
}

export default ImportExport