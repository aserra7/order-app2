import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const CategoryCard = ({ image, name }) => {
    return (
        <Link to={`/category/${name}`} style={{ textDecoration: 'none' }}>
            <Card>
                <Card.Img
                    variant='top'
                    src={image}
                    alt={name}
                    height='200px'
                    style={{
                        objectFit: 'cover',
                    }}
                />
                <Card.Body className='d-flex flex-column'>
                    <Card.Title className='d-flex justify-content-center align-items-baseline mt-2'>
                        <span className='fs-2'>{name}</span>
                    </Card.Title>
                </Card.Body>

            </Card>
        </Link>

    )
}

export default CategoryCard