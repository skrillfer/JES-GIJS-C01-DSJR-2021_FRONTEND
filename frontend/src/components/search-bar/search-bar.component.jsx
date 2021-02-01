import { Input, Button } from 'antd';
import './search-bar.styles.css'
import { ACTIONS } from '../../context-store/actions_types';
import {Context} from '../../context-store/store';
import { PlusOutlined } from '@ant-design/icons';

import { useContext } from 'react';

export default function SearchBar({emitChange}){
    const [,dispatch] = useContext(Context);
    return(
        <>
        <Input.Group compact className="search-bar">
            <Input.Search allowClear style={{ width: '40%', minWidth:'200px' }} defaultValue="" onChange ={(evt) => dispatch({ type: ACTIONS.FILTER_, payload: evt.target.value})} placeholder={"Buscar..."} />
        </Input.Group>
            <Button type="primary" shape="round" icon={<PlusOutlined />} size={'middle'} onClick={()=>{
                dispatch({ type: ACTIONS.SET_ID_MODIFY_USER, payload: null})
                dispatch({ type: ACTIONS.SHOW_MODAL })
            }}>
                Agregar fiscalia
            </Button>

        </>
    )
}
