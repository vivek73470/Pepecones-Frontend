/** @format */

import React from 'react';
import './index.css';
import womensmoke from '../../assets/User/first founder.png';
import womensmoke1 from '../../assets/User/middle founder.png';
import womensmoke2 from '../../assets/User/third founder.png';
import { useNavigate } from 'react-router-dom';

const Founder = () => {
  const navigate = useNavigate();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <>
      <div className="womenempower-3rdpagefounder">
        <div className="womenempower-3rdpage-rapperfounder">
          <div className="Womenempower-title-3rdpagefounder">
            <div className="women-2subtitlefounder">
              <h3 id="women-2subtitle-subbfounder">Founding Team</h3>
            </div>
            <div className="women-2ndheadingfounder">
              <h1>Driven Visionaries</h1>
            </div>
            <div className="women-pag2paragraphfounder">
              <p>
                Meet us, the passionate minds behind this organization.
                Committed to excellence, we lead with innovation and a shared
                vision for success.
              </p>
            </div>
            <div className="womenempower-3rdbuttonfounder">
              <button
                onClick={() => {
                  navigate('/women-empowerment');
                  scrollToTop();
                }}
                id="women-3rd-butn-discfounder"
              >
                Discover
              </button>
            </div>
          </div>

          <div className="women-3rdpage-belowtitlefounder">
            <div className="women-3rdpage-belowtitle1founder">
              <img src={womensmoke} alt="picture1" />
              <div className="overlay">
                <h4>Shubhra Jain</h4>
                <p>SEO Specialist</p>
              </div>
            </div>
            <div className="women-3rdpage-belowtitle2founder">
              <img src={womensmoke1} alt="picture2" />
              <div className="overlay2">
                <h4>Shipra Jain</h4>
                <p>Founder</p>
              </div>
            </div>
            <div className="women-3rdpage-belowtitle3founder">
              <img src={womensmoke2} alt="picture3" />
              <div className="overlay">
                <h4>Urvi Jain</h4>
                <p>Social Media and Design</p>
              </div>
            </div>
          </div>

          <div className="women-3rdpagebelow-pictrefounder">
            <div className="women-3rdpage-picture-pargfounder">
              <p>
                Introducing our core team - the pillars of our endeavor. United
                by purpose, we champion innovation and drive our shared mission
                forward.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Founder;
