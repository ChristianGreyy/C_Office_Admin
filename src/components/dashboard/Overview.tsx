import { OverviewStatistic } from '@interfaces';
import { LogApp } from '@utils';

interface IProps {
  overviewStatistic: OverviewStatistic;
  onLinkData: (item?: string) => void;
  genOverviewIcon: (item?: string) => void;
}
const OVERVIEW_TITLE = {
  totalMember: 'Members',
  totalSpending: 'Total spent',
};
export const Overview = ({ overviewStatistic, onLinkData, genOverviewIcon }: IProps) => {
  LogApp(overviewStatistic, 'overviewStatistic');
  return (
    <div className="col-span-12 mb-8">
      <div className="grid grid-cols-12 gap-6 mt-3">
        {Object.keys(overviewStatistic || 0)?.map((item) => {
          return (
            <div
              className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y"
              onClick={() => onLinkData(item)}
            >
              <div className="report-box zoom-in">
                <div className="box p-5 redirect-card">
                  {genOverviewIcon(item)}
                  <div className="text-3xl font-medium leading-8 mt-6 mb-2">
                    {/* @ts-ignore */}
                    {(item === 'totalSpending' ? '$' : '') + overviewStatistic?.[item]}
                  </div>
                  {/* @ts-ignore */}
                  <div className="text-base text-slate-500 mt-1">{OVERVIEW_TITLE[item]}</div>
                </div>
              </div>
            </div>
          );
        })}
        {/* <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                    <div className="report-box zoom-in">
                        <div className="box p-5">
                            <div className="flex">
                                <div className="ml-auto">2%</div>
                            </div>
                            <div className="text-3xl font-medium leading-8 mt-6">3.721</div>
                            <div className="text-base text-slate-500 mt-1">New Orders</div>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                    <div className="report-box zoom-in">
                        <div className="box p-5">
                            <div className="flex">
                                <div className="ml-auto">12%</div>
                            </div>
                            <div className="text-3xl font-medium leading-8 mt-6">2.149</div>
                            <div className="text-base text-slate-500 mt-1">Total Products</div>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                    <div className="report-box zoom-in">
                        <div className="box p-5">
                            <div className="flex">
                                <div className="ml-auto">22%</div>
                            </div>
                            <div className="text-3xl font-medium leading-8 mt-6">152.040</div>
                            <div className="text-base text-slate-500 mt-1">Unique Visitor</div>
                        </div>
                    </div>
                </div> */}
      </div>
    </div>
  );
};
