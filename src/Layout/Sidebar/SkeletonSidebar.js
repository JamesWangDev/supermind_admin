import React from 'react'
import { FaAngleLeft, FaArrowLeft } from 'react-icons/fa';
import { RiAppsLine } from 'react-icons/ri'

const SkeletonSidebar = ({ modifiedSidebar }) => {
    return (
        <div className="skeleton-loader">
            <div className="logo-wrapper logo-wrapper-center">
                <h2 className="text-white">Fastkart.</h2>
                <div className="back-btn">
                    <FaAngleLeft />
                </div>
                <div className="toggle-sidebar"><RiAppsLine className='status_toggle middle sidebar-toggle' /></div>
            </div>
            <nav className="sidebar-main">
                <div className="left-arrow" id="left-arrow">
                    <FaArrowLeft />
                </div>
                <div>
                    <ul className="sidebar-links" >
                        {modifiedSidebar?.map((mainMenu, i) => {
                            return (
                                <li className="sidebar-list" key={i}>
                                    <a className="">
                                        <i></i>
                                        <span className="loader-cls"></span>
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </nav >
        </div >
    )
}

export default SkeletonSidebar