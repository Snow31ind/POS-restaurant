import React, { useState } from 'react'
import { Nav } from 'react-bootstrap'
import '../styles/Home.css'
import { Link } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import { Carousel } from 'react-bootstrap'
import cupcake from '../pictures/cupcake.jpg'
import Navbar from '../comps/Navbar/Navbar'

function Home() {
    return (
			<div style={{}}>      
				<Navbar/>				
				<Carousel className='carousel'>
					<Carousel.Item>
						<img
							className="d-block w-100"
							src={cupcake}
							alt="First slide"
						/>
						<Carousel.Caption>
							<h3>First slide label</h3>
							<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
						</Carousel.Caption>
					</Carousel.Item>
					
					<Carousel.Item>
						<img
							className="d-block w-100"
							src={cupcake}
							alt="Second slide"
						/>

						<Carousel.Caption>
							<h3>Second slide label</h3>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</Carousel.Caption>
					</Carousel.Item>
				</Carousel>
			</div>
    )
}

export default Home
