import Link from "next/link";
import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/action/cart";
import { addToCompare } from "../../redux/action/compareAction";
import { openQuickView } from "../../redux/action/quickViewAction";
import { addToWishlist } from "../../redux/action/wishlistAction";

const SingleProduct = ({
    product,
    addToCart,
    addToCompare,
    addToWishlist,
    openQuickView,
}) => {
    const handleCart = (product) => {
        addToCart(product);
        toast("Product added to Cart !");
    };

    const handleCompare = (product) => {
        addToCompare(product);
        toast("Added to Compare list !");
    };

    const handleWishlist = (product) => {
        addToWishlist(product);
        toast("Added to Wishlist !");
    };
    return (
        <>
          <div className="product-cart-wrap mb-8">
            <div className="product-img-action-wrap">
              <div className="product-img product-img-zoom">
                <Link
                  href="/products/[slug]"
                  as={`/products/${product.slug}`}
                >
                  {/* Removed the <a> tag */}
                  <img
                    className="default-img"
                    src={product.images[0].img}
                    alt=""
                  />
                  <img
                    className="hover-img"
                    src={product.images[1].img}
                    alt=""
                  />
                </Link>
              </div>
              <div className="product-action-1">
                <button
                  aria-label="Quick view"
                  className="action-btn hover-up"
                  data-bs-toggle="modal"
                  onClick={(e) => openQuickView(product)}
                >
                  <i className="fi-rs-eye"></i>
                </button>
                <button
                  aria-label="Add To Wishlist"
                  className="action-btn hover-up"
                  onClick={(e) => handleWishlist(product)}
                >
                  <i className="fi-rs-heart"></i>
                </button>
                <button
                  aria-label="Compare"
                  className="action-btn hover-up"
                  onClick={(e) => handleCompare(product)}
                >
                  <i className="fi-rs-shuffle"></i>
                </button>
              </div>
      
              <div className="product-badges product-badges-position product-badges-mrg">
                {product.trending && <span className="hot">Hot</span>}
                {product.created && <span className="new">New</span>}
                {product.totalSell > 100 && (
                  <span className="best">Best Sell</span>
                )}
                {product.discount.isActive && (
                  <span className="sale">Sale</span>
                )}
                {product.discount.percentage >= 5 && (
                  <span className="hot">
                    {product.discount.percentage}%
                  </span>
                )}
              </div>
            </div>
            <div className="product-content-wrap">
              <div className="product-category">
                <Link href="/products">
                  {/* Removed the <a> tag */}
                  <span>{product.brand}</span>
                </Link>
              </div>
              <h2>
                <Link
                  href="/products/[slug]"
                  as={`/products/${product.slug}`}
                >
                  {/* Removed the <a> tag */}
                  <span>{product.title}</span>
                </Link>
              </h2>
      
              <div className="product-rate-cover">
                <div className="product-rate d-inline-block">
                  <div
                    className="product-rating"
                    style={{ width: "90%" }}
                  ></div>
                </div>
                <span className="font-small ml-5 text-CS_product_color">
                  {" "}
                  ({product.ratingScore})
                </span>
              </div>
      
              <div>
                <span className="font-small text-CS_product_color">
                  By{" "}
                  <Link href="/vendor/1">
                    {/* Removed the <a> tag */}
                    <span>NestFood</span>
                  </Link>
                </span>
              </div>
      
              <div className="product-card-bottom">
                <div className="product-price">
                  <span>${product.price} </span>
                  <span className="old-price">
                    {product.oldPrice && `$ ${product.oldPrice}`}
                  </span>
                </div>
                <div className="add-cart">
                  <button
                    className="add"
                    onClick={(e) => handleCart(product)}
                  >
                    <i className="fi-rs-shopping-cart mr-5"></i> Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      );
      
};

const mapDispatchToProps = {
    addToCart,
    addToCompare,
    addToWishlist,
    openQuickView,
};

export default connect(null, mapDispatchToProps)(SingleProduct);
