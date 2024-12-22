/** @format */

import React, { useEffect, useState } from 'react';
import {
  BiSolidBarChartAlt2,
  BiShareAlt,
  BiLogoFacebookCircle,
  BiLogoTwitter,
  BiLogoPinterest,
} from 'react-icons/bi';

import './index.css';
function Content({ blogDetails, blogDetail }) {
  console.log(blogDetails);
  return (
    <div className="wrapper">
      <div className="banner1">
        <img
          src={blogDetails?.featuredImage || blogDetail?.featuredImage}
          alt={blogDetails?.alttag || blogDetail?.alttag}
        />
      </div>

      <div className="content-blg">
        <div className="left">
          <div class="elements">
            {/* <div class="shares">
              <div class="icon-21">
                <BiShareAlt style={{ width: '30px', height: '30px' }} />
              </div>
            </div> */}
            <div class="facebook">
              <div class="icon-21">
                <BiLogoFacebookCircle
                  style={{ width: '30px', height: '30px' }}
                />
              </div>
            </div>
            <div class="twiter">
              <div class="icon-21">
                <BiLogoTwitter style={{ width: '30px', height: '30px' }} />
              </div>
            </div>
            <div class="pintrest">
              <div class="icon-21">
                <BiLogoPinterest style={{ width: '30px', height: '30px' }} />
              </div>
            </div>
          </div>
        </div>

        <div className="contentarea">
          <div className="title">
            <h1>{blogDetails?.title || blogDetail?.title}</h1>
          </div>
          <div className="tips">
            <p>{blogDetails?.author || blogDetail?.author}</p>
          </div>
          <div className="blog-content-1">
            {/* Render the fetched blog content here */}
            {blogDetails && (
              <div dangerouslySetInnerHTML={{ __html: blogDetails?.content }} />
            )}
            {blogDetail && (
              <div dangerouslySetInnerHTML={{ __html: blogDetail?.content }} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;