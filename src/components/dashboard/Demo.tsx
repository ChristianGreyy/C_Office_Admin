import React from 'react';
import { MemberTierChart } from './MemberTierChart';

const Demo = () => {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 2xl:col-span-12">
        <div className="grid grid-cols-12 gap-6">
          {/* BEGIN: General Report */}
          <div className="col-span-12 xl:col-span-9 mt-8">
            <div className="intro-y flex items-center h-10">
              <h2 className="text-lg font-medium truncate mr-5">General Report</h2>
              <a href="" className="ml-auto text-primary truncate">
                Show More
              </a>
            </div>
            <div className="report-box-2 intro-y mt-5">
              {/* <MemberTierChart /> */}
              <div className="box grid grid-cols-12">
                <div className="col-span-12 lg:col-span-4 px-8 py-12 flex flex-col justify-center">
                  {/* <Lucide icon="PieChart" className="w-10 h-10 text-pending" /> */}
                  <div className="justify-start flex items-center text-slate-600 dark:text-slate-300 mt-12">
                    My Total Assets
                    {/* <Lucide
                      icon="AlertCircle"
                      className="tooltip w-4 h-4 ml-1.5"
                      title="Total value of your sales: $158.409.416"
                    /> */}
                  </div>
                  <div className="flex items-center justify-start mt-4">
                    <div className="relative text-2xl font-medium pl-3 ml-0.5">
                      <span className="absolute text-xl font-medium top-0 left-0 -ml-0.5">$</span>
                      1,413,102.02
                    </div>
                    <a className="text-slate-500 ml-4" href="">
                      {/* <Lucide icon="RefreshCcw" className="w-4 h-4" /> */}
                    </a>
                  </div>
                  <div className="mt-4 text-slate-500 text-xs">Last updated 1 hour ago</div>
                  <button className="btn btn-outline-secondary relative justify-start rounded-full mt-12">
                    Download Reports
                    <span className="w-8 h-8 absolute flex justify-center items-center bg-primary text-white rounded-full right-0 top-0 bottom-0 my-auto ml-auto mr-0.5">
                      {/* <Lucide icon="ArrowRight" className="w-4 h-4" /> */}
                    </span>
                  </button>
                </div>
                <div className="col-span-12 lg:col-span-8 p-8 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-darkmode-300 border-dashed">
                  <ul
                    className="nav nav-pills w-60 border border-slate-300 dark:border-darkmode-300 border-dashed rounded-md mx-auto p-1 mb-8"
                    role="tablist"
                  >
                    <li id="weekly-report-tab" className="nav-item flex-1" role="presentation">
                      <button
                        className="nav-link w-full py-1.5 px-2 active"
                        data-tw-toggle="pill"
                        data-tw-target="#weekly-report"
                        type="button"
                        role="tab"
                        aria-controls="weekly-report"
                        aria-selected="true"
                      >
                        Weekly
                      </button>
                    </li>
                    <li id="monthly-report-tab" className="nav-item flex-1" role="presentation">
                      <button
                        className="nav-link w-full py-1.5 px-2"
                        data-tw-toggle="pill"
                        data-tw-target="#monthly-report"
                        type="button"
                        role="tab"
                        aria-selected="false"
                      >
                        Monthly
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content px-5 pb-5">
                    <div
                      className="tab-pane active grid grid-cols-12 gap-y-8 gap-x-10"
                      id="weekly-report"
                      role="tabpanel"
                      aria-labelledby="weekly-report-tab"
                    >
                      <div className="col-span-6 sm:col-span-6 md:col-span-4">
                        <div className="text-slate-500">Unpaid Loan</div>
                        <div className="mt-1.5 flex items-center">
                          <div className="text-base">4.501</div>
                          <div
                            className="text-danger flex text-xs font-medium tooltip cursor-pointer ml-2"
                            title="2% Lower than last month"
                          >
                            2%
                            {/* <Lucide icon="ChevronDown" className="w-4 h-4 ml-0.5" /> */}
                          </div>
                        </div>
                      </div>
                      <div className="col-span-12 sm:col-span-6 md:col-span-4">
                        <div className="text-slate-500">Active Partner</div>
                        <div className="mt-1.5 flex items-center">
                          <div className="text-base">2</div>
                        </div>
                      </div>
                      <div className="col-span-12 sm:col-span-6 md:col-span-4">
                        <div className="text-slate-500">Paid Installment</div>
                        <div className="mt-1.5 flex items-center">
                          <div className="text-base">$72.000</div>
                        </div>
                      </div>
                      <div className="col-span-12 sm:col-span-6 md:col-span-4">
                        <div className="text-slate-500">Disbursement</div>
                        <div className="mt-1.5 flex items-center">
                          <div className="text-base">$54.000</div>
                        </div>
                      </div>
                      <div className="col-span-12 sm:col-span-6 md:col-span-4">
                        <div className="text-slate-500">Success Payment</div>
                        <div className="mt-1.5 flex items-center">
                          <div className="text-base">2.500</div>
                          <div
                            className="text-success flex text-xs font-medium tooltip cursor-pointer ml-2"
                            title="52% Higher than last month"
                          >
                            52%
                            {/* <Lucide icon="ChevronUp" className="w-4 h-4 ml-0.5" /> */}
                          </div>
                        </div>
                      </div>
                      <div className="col-span-12 sm:col-span-6 md:col-span-4">
                        <div className="text-slate-500">Unpaid Loan</div>
                        <div className="mt-1.5 flex items-center">
                          <div className="text-base">$72.000</div>
                        </div>
                      </div>
                      <div className="col-span-12 sm:col-span-6 md:col-span-4">
                        <div className="text-slate-500">Posted Campaign</div>
                        <div className="mt-1.5 flex items-center">
                          <div className="text-base">4.501</div>
                        </div>
                      </div>
                      <div className="col-span-12 sm:col-span-6 md:col-span-4">
                        <div className="text-slate-500">Social Media</div>
                        <div className="mt-1.5 flex items-center">
                          <div className="text-base">2</div>
                        </div>
                      </div>
                      <div className="col-span-12 sm:col-span-6 md:col-span-4">
                        <div className="text-slate-500">Net Margin</div>
                        <div className="mt-1.5 flex items-center">
                          <div className="text-base">$72.000</div>
                          <div
                            className="text-success flex text-xs font-medium tooltip cursor-pointer ml-2"
                            title="49% Higher than last month"
                          >
                            49%
                            {/* <Lucide icon="ChevronUp" className="w-4 h-4 ml-0.5" /> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* END: General Report */}
          {/* BEGIN: Sales Report */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 row-start-4 lg:row-start-3 xl:row-start-auto mt-6 xl:mt-8">
            <div className="intro-y flex items-center h-10">
              <h2 className="text-lg font-medium truncate mr-5">Sales Report</h2>
              <a href="" className="ml-auto text-primary truncate">
                Show More
              </a>
            </div>
            <div className="report-box-2 before:hidden xl:before:block intro-y mt-5">
              <div className="box p-5">
                <div className="mt-3">{/* <ReportDonutChart height={196} /> */}</div>
                <div className="w-52 sm:w-auto mx-auto mt-8">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    <span className="truncate">17 - 30 Years old</span>
                    <span className="font-medium ml-auto">62%</span>
                  </div>
                  <div className="flex items-center mt-4">
                    <div className="w-2 h-2 bg-pending rounded-full mr-3"></div>
                    <span className="truncate">31 - 50 Years old</span>
                    <span className="font-medium ml-auto">33%</span>
                  </div>
                  <div className="flex items-center mt-4">
                    <div className="w-2 h-2 bg-warning rounded-full mr-3"></div>
                    <span className="truncate">&gt;= 50 Years old</span>
                    <span className="font-medium ml-auto">10%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* END: Sales Report */}

          {/* BEGIN: Most Viewed Pages */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4 mt-6">
            <div className="intro-y block sm:flex items-center h-10">
              <h2 className="text-lg font-medium truncate mr-5">Most Viewed Pages</h2>
              <select className="sm:ml-auto mt-3 sm:mt-0 sm:w-auto form-select box">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="custom-date">Custom Date</option>
              </select>
            </div>
            <div className="intro-y box p-5 mt-12 sm:mt-5">
              <div className="flex text-slate-500 border-b border-slate-200 dark:border-darkmode-300 border-dashed pb-3 mb-3">
                <div>Page Names</div>
                <div className="ml-auto">Page Views</div>
              </div>
              <div className="flex items-center mb-5">
                <div>/letz-lara…review/2653</div>
                <div className="ml-auto">472</div>
              </div>
              <div className="flex items-center mb-5">
                <div>/midone…review/1674</div>
                <div className="ml-auto">294</div>
              </div>
              <div className="flex items-center mb-5">
                <div>/profile…review/46789</div>
                <div className="ml-auto">500</div>
              </div>
              <div className="flex items-center mb-5">
                <div>/profile…review/24357</div>
                <div className="ml-auto">3.420</div>
              </div>
              <div className="flex items-center mb-5">
                <div>/letz-lara…review/2653</div>
                <div className="ml-auto">83</div>
              </div>
              <div className="flex items-center mb-5">
                <div>/icewall…review/1674</div>
                <div className="ml-auto">21</div>
              </div>
              <button className="btn btn-outline-secondary w-full border-slate-300 dark:border-darkmode-300 border-dashed relative justify-start mb-2">
                <span className="truncate mr-5">View Full Report</span>
                <span className="w-8 h-8 absolute flex justify-center items-center right-0 top-0 bottom-0 my-auto ml-auto mr-0.5"></span>
              </button>
            </div>
          </div>
          {/* END: Most Viewed Pages */}
          {/* BEGIN: Top Search Items */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4 mt-6">
            <div className="intro-y block sm:flex items-center h-10">
              <h2 className="text-lg font-medium truncate mr-5">Top Search Items</h2>
              <select className="sm:ml-auto mt-3 sm:mt-0 sm:w-auto form-select box">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="custom-date">Custom Date</option>
              </select>
            </div>
            <div className="intro-y box p-5 mt-12 sm:mt-5">
              <div className="flex text-slate-500 border-b border-slate-200 dark:border-darkmode-300 border-dashed pb-3 mb-3">
                <div>Keywords</div>
                <div className="ml-auto">Searched</div>
              </div>
              <div className="flex items-center mb-5">
                <div>Laravel 8</div>
                <div className="ml-auto">200</div>
              </div>
              <div className="flex items-center mb-5">
                <div>Eloquent</div>
                <div className="ml-auto">50</div>
              </div>
              <div className="flex items-center mb-5">
                <div>CKEditor Source Build</div>
                <div className="ml-auto">31</div>
              </div>
              <div className="flex items-center mb-5">
                <div>Midone Docs</div>
                <div className="ml-auto">405</div>
              </div>
              <div className="flex items-center mb-5">
                <div>Vue 3 Release Date</div>
                <div className="ml-auto">201</div>
              </div>
              <div className="flex items-center mb-5">
                <div>Install Vite Vue</div>
                <div className="ml-auto">42</div>
              </div>
              <button className="btn btn-outline-secondary w-full border-slate-300 dark:border-darkmode-300 border-dashed relative justify-start mb-2">
                <span className="truncate mr-5">View Full Report</span>
                <span className="w-8 h-8 absolute flex justify-center items-center right-0 top-0 bottom-0 my-auto ml-auto mr-0.5">
                  {/* <Lucide icon="ArrowRight" className="w-4 h-4" /> */}
                </span>
              </button>
            </div>
          </div>
          {/* END: Top Search Items */}
        </div>
      </div>
      {/* BEGIN: Schedules */}
      {/* <div className="col-span-12 2xl:col-span-3">
        <div className="2xl:border-l -mb-10 pb-10">
          <div className="2xl:pl-6 grid grid-cols-12 gap-x-6 2xl:gap-x-0 gap-y-6">
            <div className="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-12 xl:col-start-1 xl:row-start-2 2xl:col-start-auto 2xl:row-start-auto mt-3">
              <div className="intro-x flex items-center h-10">
                <h2 className="text-lg font-medium truncate mr-5">Schedules</h2>
                <a href="" className="ml-auto text-primary truncate flex items-center">
                </a>
              </div>
              <div className="mt-5">
                <div className="intro-x box">
                  <div className="p-5">
                    <div className="flex">
                      <div className="font-medium text-base mx-auto">April</div>
                    </div>
                    <div className="grid grid-cols-7 gap-4 mt-5 text-center">
                      <div className="font-medium">Su</div>
                      <div className="font-medium">Mo</div>
                      <div className="font-medium">Tu</div>
                      <div className="font-medium">We</div>
                      <div className="font-medium">Th</div>
                      <div className="font-medium">Fr</div>
                      <div className="font-medium">Sa</div>
                      <div className="py-0.5 rounded relative text-slate-500">29</div>
                      <div className="py-0.5 rounded relative text-slate-500">30</div>
                      <div className="py-0.5 rounded relative text-slate-500">31</div>
                      <div className="py-0.5 rounded relative">1</div>
                      <div className="py-0.5 rounded relative">2</div>
                      <div className="py-0.5 rounded relative">3</div>
                      <div className="py-0.5 rounded relative">4</div>
                      <div className="py-0.5 rounded relative">5</div>
                      <div className="py-0.5 bg-success/20 dark:bg-success/30 rounded relative">
                        6
                      </div>
                      <div className="py-0.5 rounded relative">7</div>
                      <div className="py-0.5 bg-primary text-white rounded relative">8</div>
                      <div className="py-0.5 rounded relative">9</div>
                      <div className="py-0.5 rounded relative">10</div>
                      <div className="py-0.5 rounded relative">11</div>
                      <div className="py-0.5 rounded relative">12</div>
                      <div className="py-0.5 rounded relative">13</div>
                      <div className="py-0.5 rounded relative">14</div>
                      <div className="py-0.5 rounded relative">15</div>
                      <div className="py-0.5 rounded relative">16</div>
                      <div className="py-0.5 rounded relative">17</div>
                      <div className="py-0.5 rounded relative">18</div>
                      <div className="py-0.5 rounded relative">19</div>
                      <div className="py-0.5 rounded relative">20</div>
                      <div className="py-0.5 rounded relative">21</div>
                      <div className="py-0.5 rounded relative">22</div>
                      <div className="py-0.5 bg-pending/20 dark:bg-pending/30 rounded relative">
                        23
                      </div>
                      <div className="py-0.5 rounded relative">24</div>
                      <div className="py-0.5 rounded relative">25</div>
                      <div className="py-0.5 rounded relative">26</div>
                      <div className="py-0.5 bg-primary/10 dark:bg-primary/50 rounded relative">
                        27
                      </div>
                      <div className="py-0.5 rounded relative">28</div>
                      <div className="py-0.5 rounded relative">29</div>
                      <div className="py-0.5 rounded relative">30</div>
                      <div className="py-0.5 rounded relative text-slate-500">1</div>
                      <div className="py-0.5 rounded relative text-slate-500">2</div>
                      <div className="py-0.5 rounded relative text-slate-500">3</div>
                      <div className="py-0.5 rounded relative text-slate-500">4</div>
                      <div className="py-0.5 rounded relative text-slate-500">5</div>
                      <div className="py-0.5 rounded relative text-slate-500">6</div>
                      <div className="py-0.5 rounded relative text-slate-500">7</div>
                      <div className="py-0.5 rounded relative text-slate-500">8</div>
                      <div className="py-0.5 rounded relative text-slate-500">9</div>
                    </div>
                  </div>
                  <div className="border-t border-slate-200/60 p-5">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-pending rounded-full mr-3"></div>
                      <span className="truncate">UI/UX Workshop</span>
                      <span className="font-medium xl:ml-auto">23th</span>
                    </div>
                    <div className="flex items-center mt-4">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span className="truncate">VueJs Frontend Development</span>
                      <span className="font-medium xl:ml-auto">10th</span>
                    </div>
                    <div className="flex items-center mt-4">
                      <div className="w-2 h-2 bg-warning rounded-full mr-3"></div>
                      <span className="truncate">Laravel Rest API</span>
                      <span className="font-medium xl:ml-auto">31th</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* END: Schedules */}
    </div>
  );
};

export default Demo;
