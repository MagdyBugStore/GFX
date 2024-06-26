import { useState } from "react";
import useClickOutside from "../util/outsideClick";
import provides from '../static_data/provieds.json';
import DLtoggle from "../components/elements/DLtoggle";
import packages from '../static_data/packages.json';
import services from '../static_data/services.json';
import staticValues from '../static_data/static.json';
import getmode from '../util/storage';
import { useTranslation } from 'react-i18next';
import { connect } from "react-redux";
import { nestChildren } from "../util/util";
import Search from "./ecommerce/Search";

const MobileMenu = ({ isToggled, toggleClick, GetCategoriesRespond }) => {
    const [isDark, setIsDark] = useState(true);
    const [providesSelected, setProvides] = useState(0);
    const [openCategories, setOpenCategories] = useState(null);
    const [openSubCategories, setOpenSubCategories] = useState(null);
    const [menuVisible, setMenuVisible] = useState(false); // State to handle dropdown visibility
    const { i18n, t } = useTranslation();
    const currentLanguage = i18n.language;

    GetCategoriesRespond = GetCategoriesRespond ? nestChildren(GetCategoriesRespond) : null;
    const GetCategoriesFilter = GetCategoriesRespond?.filter((value) => provides[providesSelected].list.includes(value._id)) || [];

    const toggleLanguage = () => {
        const newLanguage = currentLanguage === 'en' ? 'ar' : 'en';
        i18n.changeLanguage(newLanguage);
        localStorage.setItem('language', newLanguage);
    };

    const toggleCategory = (category) => {
        setOpenCategories(prev => prev === category ? null : category);
        setOpenSubCategories(null);
    };

    const toggleSubcategory = (subcategory) => {
        setOpenSubCategories(prev => prev === subcategory ? null : subcategory);
    };

    let domNode = useClickOutside(() => {
        setOpenCategories(null);
        setOpenSubCategories(null);
        setMenuVisible(false); // Hide dropdown when clicking outside
    });

    const dir = currentLanguage === "ar" ? "rtl" : "ltr";
    const dropDir = currentLanguage === 'en' ? " right-0" : " left-0";

    return (
        <>
            <div className={isToggled ? "mobile-header-active mobile-header-wrapper-style sidebar-visible" : "mobile-header-active mobile-header-wrapper-style"}>
                <div className="mobile-header-wrapper-inner bg-CS_bg_color" dir={dir}>
                    <div className="mobile-header-top bg-CS_bg_color">
                        <div className="mobile-header-logo">
                            <a href="#">
                                <img src={!isDark ? "/assets/imgs/theme/light-logo.png" : "/assets/imgs/theme/dark-logo.png"} alt="logo" />
                            </a>
                        </div>
                        <div className="mobile-menu-close close-style-wrap close-style-position-inherit">
                            <button className="close-style search-close" onClick={toggleClick}>
                                <i className="icon-top"></i>
                                <i className="icon-bottom"></i>
                            </button>
                        </div>
                    </div>

                    <div className="provides container hidden lg:flex sm:flex-row justify-between w-full">
                        {provides.map((value, index) => providesSelected === index ? (
                            <div key={index} className="p-4 font-bold bg-CS_text_active text-white transition-all w-full flex justify-center items-center md:w-auto md:flex-1">
                                {value.title}
                            </div>
                        ) : (
                            <div key={index} className="p-4 font-bold cursor-pointer transition-all w-full flex justify-center items-center md:w-auto md:flex-1" onClick={() => setProvides(index)}>
                                {value.title}
                            </div>
                        ))}
                    </div>
                    <Search />
                    <div className="mobile-header-content-area">
                        <div className="mobile-menu-wrap mobile-header-border">
                            <nav>
                                <ul className="mobile-menu" ref={domNode}>
                                    {GetCategoriesFilter.map((category) => (
                                        <li key={category._id} className="menu-item-has-children">
                                            <span className={`menu-expand ${dropDir}`} onClick={() => toggleCategory(category._id)}>
                                                <i className="fi-rs-angle-small-down" />
                                            </span>
                                            <a href={`/products/${category._id}`}>{currentLanguage === 'en' ? category.name : category.nameAr}</a>
                                            <ul className={openCategories === category._id ? "dropdown" : "dropdown-close"}>
                                                {category.children.map((subCategory) => (
                                                    <li key={subCategory._id} className={`menu-item-has-children ${openSubCategories === subCategory._id ? 'active' : ''}`}>
                                                        <span className={`menu-expand ${dropDir}`} onClick={() => toggleSubcategory(subCategory._id)}>
                                                            <i className="fi-rs-angle-small-down" />
                                                        </span>
                                                        <a href={`/products/${subCategory._id}`}>
                                                            {currentLanguage === 'en' ? subCategory.name : subCategory.nameAr}
                                                        </a>
                                                        <ul className={`flex flex-wrap ${openSubCategories === subCategory._id ? "dropdown" : "dropdown-close"}`}>
                                                            {subCategory.children.map((child) => (
                                                                <div key={child._id}>
                                                                    <a href={`/products/${child._id}`}>
                                                                        <div className="hover:text-CS_text_active border rounded-lg flex justify-center gap-2 items-center flex-col p-2 size-36 text-center">
                                                                            <img className="size-20" src={child.thumbnail} alt="category img" />
                                                                            {currentLanguage === 'en' ? child.name : child.nameAr}
                                                                        </div>
                                                                    </a>
                                                                </div>
                                                            ))}
                                                        </ul>

                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    ))}

                                </ul>
                            </nav>
                        </div>

                        <div className="py-6" dir="ltr">
                            <input onChange={toggleLanguage} type="checkbox" className="DL_checkbox checkbox w-min h-min" id="lang-checkbox" />
                            <label htmlFor="lang-checkbox" className="checkbox-label flag-container">
                                <img src="/assets/imgs/theme/flag-en.png" alt="" />
                                <img src="/assets/imgs/theme/flag-ar.png" alt="" />
                                <span className={`lang-ball ${currentLanguage}`}></span>
                            </label>
                        </div>
                        <div className="py-6" dir="ltr">
                            <DLtoggle ckey={3} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({
    GetCategoriesRespond: state.api.GetCategories,
});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(MobileMenu);
