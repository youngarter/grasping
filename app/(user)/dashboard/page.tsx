import { ChartBar } from "@/components/charts/chart-bar";
import { ChartPie } from "@/components/charts/chart-pie";
import { ChartTabs } from "@/components/charts/chart-tabs";

export default async function Page() {
  return (
    <div className="space-y-6">
      <br />

      {/* Sample content grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-primary font-semibold">{i}</span>
              </div>
            </div>
            <h3 className="font-semibold text-card-foreground">Card Title</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Add your content here
            </p>
          </div>
        ))}
      </div>

      <div>
        <h1 className="text-3xl font-bold text-foreground">Welcome</h1>
        <p className="text-muted-foreground mt-2">
          Your dashboard is ready to use
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* / Chart section this is just an example, you can replace it with your own content */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <ChartTabs />
        </div>
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <ChartBar />
        </div>
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <ChartPie />
        </div>
      </div>
      
    </div>
  );
}
