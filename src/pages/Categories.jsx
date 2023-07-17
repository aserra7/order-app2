import React, { useEffect, useState } from 'react'
import CategoryCard from '../components/CategoryCard'
import { Col, Container, Row } from 'react-bootstrap'
import connection from '../database/connection'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'


const Categories = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const db = getFirestore(connection);
            const categoriesCol = collection(db, 'categories')
            const categoriesSnapshot = await getDocs(categoriesCol)
            const categoriesList = categoriesSnapshot.docs.map(doc => doc.data());
            setData(categoriesList)
        }

        fetchData();
    }, [])
    return (
        <Container>
            <Row md={2} xs={1} lg={3} className='g-3 '>
                {data.map((categoria) =>
                    <Col>
                        <CategoryCard key={categoria.id} image={categoria.imatge} name={categoria.nom} />
                    </Col>
                )}
            </Row>
        </Container>

    )
}

export default Categories