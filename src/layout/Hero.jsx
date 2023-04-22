import React from 'react'

const Hero = () => {
  return (
    <div className="hero">
                <nav className="nav">
                    <h1 className="navTitle">arctictech</h1>
                    <ul className="navLinks">
                        <li>
                            <a href="#">home</a>
                        </li>
                        <li>
                            <a href="#">about us</a>
                        </li>
                        <li>
                            <a href="#">products</a>
                        </li>
                        <li>
                            <a href="#">contact us</a>
                        </li>
                    </ul>
                </nav>
                <div className="heroContent">
                    <h1 className="heroTitle">
                        Revolutionize Your Business with ArticTech
                    </h1>
                    <p className="heroText">
                        We provide cutting-edge software solutions for your
                        business needs. Our team of experts will work with you
                        to ensure your success.
                    </p>
                    <button href="#" className="heroButton">
                        Get Started
                    </button>
                </div>
            </div>
  )
}

export default Hero