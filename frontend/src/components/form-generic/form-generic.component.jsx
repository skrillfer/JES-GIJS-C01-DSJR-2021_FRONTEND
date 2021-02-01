/* eslint-disable no-template-curly-in-string */
import { Form, Input, Button } from 'antd';
import React, { useState, useContext } from 'react';
import { ACTIONS } from '../../context-store/actions_types';
import { Context } from '../../context-store/store';
import { createProsecution, editProsecution } from '../../api/consume';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const validateMessages = {
    required: '${label} es requerido!'
  };


  export default function FormGeneric ({idParam}){
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [state,dispatch] = useContext(Context);

  

    const getUserToModify = () => {
      if(state.userId){
        const userFinded = state.prosecutions.find(item => item.id === state.userId);
        if(userFinded){
          console.log(userFinded)
          return userFinded;
        }    
        return null;
      }else{        
        return {};
      }
    }
    if(!idParam){
      form.resetFields();
    }else{
      form.setFieldsValue({user:getUserToModify()})
    }
    
    const onFinish = (values) => {
        console.log(values);
        setLoading(true);
        if(!idParam){
          createProsecution(values.user)
          .then(resp => {
            console.log(resp);
            dispatch({ type: ACTIONS.SET_ID_MODIFY_USER, payload: null})
            dispatch({ type: ACTIONS.ADD_NEW, payload: resp.data })

            form.resetFields();
  
            dispatch({ type: ACTIONS.HIDE_MODAL });
            setLoading(false);
            
          })
          .catch(error => console.log(error), setLoading(false))
        }else{
          editProsecution({...values.user, id: state.userId})
          .then(resp => {
            console.log(resp);
            dispatch({ type: ACTIONS.SET_ID_MODIFY_USER, payload: null})
            dispatch({ type: ACTIONS.UPDATE_ITEM, payload: resp.data })

            form.resetFields();
  
            dispatch({ type: ACTIONS.HIDE_MODAL });
            setLoading(false);
            
          })
          .catch(error => console.log(error), setLoading(false))
        }
        
        
    };
    return (
      <>
      
        <Form {...layout} 
        form={form}
       
        name="nest-messages" 
        onFinish={onFinish} 
        initialValues={{}}
        validateMessages={validateMessages}>
          <Form.Item name={['user', 'name']} label="Nombre" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={['user', 'description']} label="Descripcion" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={['user', 'tel']} label="Telefono" rules={[
            {
                required: true,
                message: 'Numero de telefono es requerido',
            },{
                pattern: /[2-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/,
                message: 'Porfavor ingrese un numero de telefono valido.',
            }
        ]}>
            <Input />
          </Form.Item>
          <Form.Item name={['user', 'address']} label="Direccion" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Agregar
            </Button>
          </Form.Item>
        </Form>
        </>
      );
  }