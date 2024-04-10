import React, { useContext, useEffect, useState } from 'react'
import { Input, Table } from 'reactstrap'
import Btn from '../../Elements/Buttons/Btn'
import ShowModal from '../../Elements/Alerts&Modals/Modal'
import { QuestionNAnswerAPI } from '../../Utils/AxiosUtils/API'
import useCreate from '../../Utils/Hooks/useCreate'
import { useTranslation } from '@/app/i18n/client'
import I18NextContext from '@/Helper/I18NextContext'

const AnswerModal = ({ fullObj, modal, setModal }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, "common");
    const [answer, setAnswer] = useState('')
    useEffect(() => {
        fullObj?.answer && setAnswer(fullObj?.answer)
    }, [fullObj?.answers])
    const { mutate, isLoading } = useCreate(QuestionNAnswerAPI, false, false, false, (resDta) => {
        setModal(false)
    });
    const onSubmit = () => {
        mutate({
            question: fullObj?.question,
            answer: answer ? answer : fullObj?.answer,
            product_id: fullObj?.product_id
        })
    }
    return (
        <ShowModal open={modal} setModal={setModal} close={true} title={"Answers"} noClass={true}
        >
            <div className="qa-modal">
                <div className="border rounded-3 mb-4">
                    <Table className="table all-package theme-table no-footer">
                        <tbody>
                            <tr>
                                <td className="text-start fw-semibold">{t('Question')}</td>
                                <td className="text-start">
                                    {fullObj?.question}
                                </td>
                            </tr>
                            <tr>
                                <td className="text-start fw-semibold">{t('Answers')}</td>
                                <td className="text-start">
                                    <Input type='textarea' placeholder="Enter Answers" value={answer} onChange={(e) => setAnswer(e?.target?.value)} />
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div>
                    <div className="button-box">
                        <Btn title="Close" className="btn btn-md fw-bold" onClick={() => setModal(false)} />
                        <Btn title="Submit" className="btn btn-md btn-theme fw-bold" loading={Number(isLoading)} onClick={() => onSubmit()} />
                    </div>
                </div>
            </div></ShowModal>
    )
}

export default AnswerModal