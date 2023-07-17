import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import FoodCard from '../components/FoodCard'
import { menjars } from '../assets/database/basedades'
import { useParams } from 'react-router-dom'
import connection from '../database/connection'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'


const Category = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const db = getFirestore(connection);
            const producteCol = collection(db, 'productes')
            const producteSnapshot = await getDocs(producteCol)
            const producteList = producteSnapshot.docs.map(doc => doc.data());
            setData(producteList)
        }

        fetchData();
    }, [])
    const { id } = useParams();
    console.log(id)
    return (
        <div>
            <Row md={2} xs={1} lg={3} className='g-3'>
                {data.map(menjar => (
                    menjar.categoria.includes(id) &&
                    <Col key={menjar.id}>
                        <FoodCard name={menjar.nom} image={menjar.imatge} preu={menjar.preu} id={menjar.id} />
                    </Col>
                ))}
            </Row>
        </div>


    )
}

export default Category