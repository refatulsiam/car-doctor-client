import React from "react";
import { Link } from "react-router-dom";

const ServiceCard = ({service}) => {
    const {title, _id, img, price, description} = service;
  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
      <figure>
        <img
          src={img}
          alt="Service"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>
          {description.length < 250 ? <>{description}</> :
            <>{description.slice(0,50)}...<Link className="text-red-600 font-bold" to={`checkout/${_id}`}>Read More</Link></>
        }
          </p>
        <p className="text-cyan-950">Price: ${price}</p>
        <div className="card-actions justify-end">
            <Link to={`/checkout/${_id}`}>
                <button className="btn btn-primary">Book Now</button>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
