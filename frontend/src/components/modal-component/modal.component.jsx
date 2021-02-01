import React, {  useContext } from 'react';
import { Button, Modal } from 'antd';
import { Context } from '../../context-store/store';
import { ACTIONS } from '../../context-store/actions_types'
import FormGeneric from '../form-generic/form-generic.component';
export default function ModalGeneric({handleOkInstruccion}){
    const [state,dispatch] = useContext(Context);
    
    
    const handleCancel = () => {
        dispatch({ type: ACTIONS.HIDE_MODAL });
    };

    return (
        <>
        {state.userId?
        <Modal
            getContainer={false}
            visible={state.toogleModal}
            title="Modificar"
            onCancel={handleCancel}
            footer={[
            <Button key="back" onClick={handleCancel}>
                Regresar
            </Button>
            ]}
        >
            <FormGeneric idParam={1}/>
        </Modal>
        :
        <Modal
        getContainer={false}
        visible={state.toogleModal}
        title="Nuevo"
        onCancel={handleCancel}
        footer={[
        <Button key="back" onClick={handleCancel}>
            Regresar
        </Button>
        ]}
        >
            <FormGeneric idParam={null}/>
        </Modal>
        }
        </>
    );

}