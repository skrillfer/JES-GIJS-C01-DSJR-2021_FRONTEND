import React, { useEffect, useContext } from 'react';
import { getAllProsecution, deleteProsecution } from '../../api/consume';
import { Context } from '../../context-store/store'
import { ACTIONS } from '../../context-store/actions_types'
import ModalGeneric from '../../components/modal-component/modal.component'
import { List, Avatar, Space,Popconfirm, message, Button } from 'antd';
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';

const IconText = ({ icon, text, twoToneColor, onClick }) => (
    <Space >
      {React.createElement(icon,{twoToneColor: twoToneColor, onClick: () => onClick() })}
      {text}
    </Space>
  );

export default function MainComponent(){
    const [state,dispatch] = useContext(Context);
    useEffect(() => {
        const getAll = () => {
            getAllProsecution()
                .then(resp => {
                    console.log(resp.data)
                    dispatch({ type: ACTIONS.SET_DATA, payload:resp.data });
                })
                .catch(error => console.log(error));
        }
        getAll();
    },
    [dispatch]);

    const onDelete = (id) => {
        console.log(`Delete ${id}`);
        deleteProsecution(id)
        .then(resp => {
            dispatch({ type: ACTIONS.REMOVE_ITEM, payload: id})
        })
        .catch(error => console.log(error))
    }

    const onEdit = (id) => {
        console.log(`Edit ${id}`);
        dispatch({ type: ACTIONS.SET_ID_MODIFY_USER, payload: id})
        dispatch({ type: ACTIONS.SHOW_MODAL })
    }
    return(
        <>
        <ModalGeneric handleOkInstruccion={async () => console.log('aa')}/>
        <List
        style={{padding:'24px 24px'}}
            itemLayout="horizontal"
            size="default"
            pagination={{
            onChange: page => {
                console.log(page);
            },
            pageSize: 3,
            }}
            dataSource={state.prosecutions}
            footer={
                <div>
                    <b>Fiscalias</b>
                </div>
            }
            renderItem={item => (
                <List.Item

                    key={item.id}
                    actions={[
                    <IconText 
                        icon={EditTwoTone}  
                        key="list-vertical-star-o" 
                        text="editar" 
                        onClick={() => onEdit(item.id)}/>,
                        <Popconfirm placement="top" title={'Seguro que quieres eliminarlo?'} onConfirm={()=>onDelete(item.id)} okText="Si" cancelText="No">
                            <IconText 
                            icon={DeleteTwoTone}  
                            key="list-vertical-like-o" 
                            twoToneColor={"#eb2f96"} 
                            text="eliminar" 
                            /*onClick={() => onDelete(item.id)}*//>
                        </Popconfirm>

                    ,
                    ]}
                >
                    <List.Item.Meta
                        avatar={<Avatar src={'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'} />}
                        title={<a href={'/#'}>{`${item.name}- ${item.tel}`}</a>}
                        description={item.username}
                    />
                    {item.description}
                </List.Item>
        )}
        />
        </>
    )
}