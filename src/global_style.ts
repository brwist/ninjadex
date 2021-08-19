import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
html,body{
  background: #11161D;
  font-family: 'Open Sans', sans-serif;
}
input[type=number]::-webkit-inner-spin-button {
  opacity: 0;
}
input[type=number]:hover::-webkit-inner-spin-button,
input[type=number]:focus::-webkit-inner-spin-button {
  opacity: 0.25;
}
/* width */
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
/* Track */
::-webkit-scrollbar-track {
  background: #2d313c;
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: #5b5f67;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #5b5f67;
}
.ant-table-tbody > tr.ant-table-row:hover > td {
  background: #273043;
}
.ant-table-tbody > tr > td {
  border-bottom: 8px solid #0f091a;
}
.ant-table-container table > thead > tr:first-child th {
  border-bottom: none;
}
.ant-divider-horizontal.ant-divider-with-text::before, .ant-divider-horizontal.ant-divider-with-text::after {
  border-top: 1px solid #434a59 !important;
}
.ant-layout {
    background: #161520;
  }
  .ant-table {
    background: linear-gradient(241.25deg, #222635 4.4%, rgba(33, 35, 44, 0.71) 61.77%, rgba(26, 32, 53, 0.49) 119.94%);
    min-width: 100%;
    width: fit-content;
  }
  .ant-table-thead > tr > th {
    background: transparent;
  }
.ant-table-thead th.ant-table-column-has-sorters:hover {
    background: transparent;
}
.ant-table-tbody > tr.ant-table-placeholder > td{
  background: transparent;
}
.ant-table-tbody > tr > td{
  border-bottom: 0px;
}
.ant-table-tbody > tr.ant-table-placeholder:hover > td{
  background: transparent;
}
.ant-select-item-option-content {
  img {
    margin-right: 4px;
  }
}
.ant-modal-content {
  background-color: #212734;
}
.ant-select-selector{
  mix-blend-mode: normal;
  /* accent_blue */

  border: 1px solid #851CEF !important;
  border-radius: 6px !important;
}
.learnsearch .ant-select-selector{
  mix-blend-mode: normal;
  /* accent_blue */

  border: 1px solid transparent !important;
  border-radius: 6px !important;
}
@-webkit-keyframes highlight {
  from { background-color: #2abdd2;}
  to {background-color: #0f091a;}
}
@-moz-keyframes highlight {
  from { background-color: #2abdd2;}
  to {background-color: #0f091a;}
}
@-keyframes highlight {
  from { background-color: #2abdd2;}
  to {background-color: #0f091a;}
}
.flash {
  -moz-animation: highlight 0.5s ease 0s 1 alternate ;
  -webkit-animation: highlight 0.5s ease 0s 1 alternate;
  animation: highlight 0.5s ease 0s 1 alternate;
}
.lofBQV, .cIKpxU {
    border-radius: 10px;
    background: linear-gradient(241.25deg, #222635 4.4%, rgba(33, 35, 44, 0.71) 61.77%, rgba(26, 32, 53, 0.49) 119.94%);;
    box-shadow: 0px 51px 69px rgba(23, 18, 43, 0.585739);
    backdrop-filter: blur(23px);
    border: 1px solid #851CEF;
}
.tradepagerowtwo .lofBQV, .tradepagerowtwo .cIKpxU{
  min-height: 430px !important;
  border: 1px solid #851CEF;
}

.tradetabletwo .lofBQV, .tradetabletwo .cIKpxU{
  min-height: 470px;
}

.tradetabletwo .lofBQV .scrolltrade, .tradetabletwo .cIKpxU .scrolltrade{
  min-height: 350px;
}

.tradepagerowtwosmaller .lofBQV, .tradepagerowtwosmaller .cIKpxU{
  min-height: 430px !important;
  border: 1px solid #851CEF;
}

.tradepagerowthreesmaller .lofBQV, .tradepagerowthreesmaller .cIKpxU{
  min-height: 480px !important;
  border: 1px solid #851CEF;
}
.tradepagerowthreesmaller .lofBQV .ordebookdz,.tradepagerowthreesmaller .cIKpxU .ordebookdz{
  max-height: 295px !important;
}

.ant-menu-submenu-title span{
    border: 1px solid white;
    padding: 0px 10px 2px 10px;
}
.endmenu {
    place-content: flex-end;
}

@media screen and (max-width: 575px) {
.midmenu, .endmenu {
    place-content: center !important;
    text-align: center;
  }
}
.ant-modal-content{
  background: #2E2C3C;
  border: 2px solid #6F2DA8;
  border-radius: 10px;
}
.ant-modal-header{
  background: #851CEF;
  border-radius: 10px 10px 0px 0px;
}
.ant-modal-wrap{
  background: rgba(255, 255, 255, 0.1);
backdrop-filter: blur(30px);
}
.ant-modal-title{
  text-align: center;
  font-weight:700;
}
.tradingview-widget-container {
  position: relative;
}
.tradingview-widget-container:before {
  content: '';
  position: absolute;
  width: 100%;
  height: 34px;
  background-color: #fff;
} 
.ant-menu-horizontal > .ant-menu-item{
  font-size:22px;
}
.ant-menu-horizontal > .ant-menu-item, .ant-menu-horizontal > .ant-menu-submenu {
  color: #898989;
}

.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-active, 
.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-active, 
.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-open, 
.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-open, 
.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-selected, 
.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-selected {
    color: #fff;
    border-bottom: 3px solid #fff;

}

.ant-slider-track, .ant-slider ant-slider-track:hover {
    background-color: #fff !important;
    opacity: 0.75;
}
.ant-slider-track, .ant-slider ant-slider-track {
    background-color: #fff;
    opacity: 0.75;
}
.ant-slider-dot-active, .ant-slider-handle, .ant-slider-handle-click-focused, .ant-slider:hover .ant-slider-handle:not(.ant-tooltip-open) {
    border: 2px solid #fff !important;
}
.ant-slider-handle{
  background: #851CEF;
box-shadow: 0px 0px 14px 2px #851CEF;
}
.ant-slider-track{
  border: 1px solid #FFFFFF;
}
.ant-switch-checked {
    background-color: #851CEF;
}
.eZVpPo, .gbgfMs {
  padding-bottom: 0px;
}
.ant-select:not(.ant-select-disabled) .ant-select-selector {
    // min-height: 40px;
}
.ant-select-selection-search-input{
    vertical-align: -webkit-baseline-middle;
}
.ant-select-single .ant-select-selector .ant-select-selection-placeholder {
  padding-top: 5px;
}
.learnsearch{
    background: transparent;
    width: 65%;
    border: 2px solid rgb(255, 255, 255);
    box-sizing: border-box;
    border-radius: 8px;
    min-height: 49px;
    margin-top: 10px;
    font-size: 20px;
}
.learnbox{
  display: flex;
  border-radius: 8px;
  background: linear-gradient(45deg, rgba(133,28,239,0.6) 33%, rgba(0,255,85,0.6) 66%);
  padding: 2px;
  height: 100%;
}
.learnbox:hover{
  background: #851CEF;
}
.learnbox1{
  background: #851CEF;
  padding: 60px 30px 60px 30px;
  border-radius: 8px 0px 0px 8px;
}
.learnbox2{
  background: linear-gradient(315deg, rgba(44,51,77,1) 43%, rgba(31,35,49,0.989233193277311) 95%);
  padding: 20px 20px 20px 20px;
  border-radius: 0px 8px 8px 0px;
  width: 100%;
}
.anticon{
  color: #851CEF !important;
}
.tabbawah > .ant-tabs-nav{
  padding: 0px 20px 0px 20px !important;
}
.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #fff;
    font-weight: 700;
}
.ant-tabs-tab:hover{
  color: #851CEF;
}
.ant-tabs-tab{
  font-size: 16px;
}

.sIzqv,.iDhzRL{
    background: #0EE9A7;
    border-color: #0EE9A7;
    border-radius: 6px;
}
.dVaoRV,.hSaKRS{
    background: #FF4747;
    border-color: #FF4747;
    border-radius: 6px;
}

.sIzqv:hover,.iDhzRL:hover{
    background: #1c795d;
    border-color: #1c795d;
    border-radius: 6px;
}
.dVaoRV:hover,.hSaKRS:hover{
    background: #841d1d;
    border-color: #841d1d;
    border-radius: 6px;
}


  font-size:22px;
}
.ant-menu-submenu {
  &:hover {
    border-bottom: none !important;
  }
}
.ant-menu-submenu-title {
  &:hover {
    color: #851CEF !important;
    border-bottom: 3px solid #851CEF !important;
  }
}
.arrow_white{
  color: #fff !important;
  margin-top: 6px;
  margin-left: 12px;
}
.ant-radio-button-wrapper{
  min-height: 40px;
  border-radius: 8px;
}
.ant-radio-button-wrapper span{
  vertical-align: sub;
}
.ant-divider-horizontal.ant-divider-with-text::before, .ant-divider-horizontal.ant-divider-with-text::after{
  border-top: 0px solid transparent !important;
}
.text-white{
  color: #fff !important;
}

`;
