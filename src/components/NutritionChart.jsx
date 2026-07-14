import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = {
  Protein: '#3b82f6',
  Carbs: '#f59e0b',
  Fat: '#f43f5e',
};

const SIZE_MAP = {
  sm: 160,
  md: 220,
  lg: 280,
};

const CustomTooltip = ({ active, payload, totalCalories }) => {
  if (!active || !payload?.length) return null;

  const { name, grams, calories } = payload[0].payload;
  const percentage = ((calories / totalCalories) * 100).toFixed(1);

  return (
    <div className="glass rounded-xl px-4 py-3 text-sm shadow-xl border border-white/10">
      <p className="font-semibold text-white mb-1">{name}</p>
      <p className="text-slate-300">{grams}g · {calories} kcal</p>
      <p className="text-slate-400">{percentage}% of total</p>
    </div>
  );
};

const NutritionChart = ({ protein = 0, carbs = 0, fat = 0, calories, size = 'md' }) => {
  const data = [
    { name: 'Protein', grams: protein, calories: protein * 4 },
    { name: 'Carbs', grams: carbs, calories: carbs * 4 },
    { name: 'Fat', grams: fat, calories: fat * 9 },
  ];

  const totalCalories = calories || data.reduce((sum, d) => sum + d.calories, 0);
  const dimension = SIZE_MAP[size] || SIZE_MAP.md;
  const innerRadius = dimension * 0.3;
  const outerRadius = dimension * 0.4;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Chart */}
      <div className="relative" style={{ width: dimension, height: dimension }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              dataKey="calories"
              stroke="none"
              animationDuration={1200}
              animationEasing="ease-out"
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={COLORS[entry.name]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip totalCalories={totalCalories} />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-bold text-white leading-none">
            {totalCalories}
          </span>
          <span className="text-xs text-slate-400 mt-0.5">kcal</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
        {data.map((entry) => {
          const percentage = totalCalories > 0
            ? ((entry.calories / totalCalories) * 100).toFixed(0)
            : 0;

          return (
            <div key={entry.name} className="flex items-center gap-2 text-sm">
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: COLORS[entry.name] }}
              />
              <span className="text-slate-300">{entry.name}</span>
              <span className="text-slate-500">
                {entry.grams}g · {percentage}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NutritionChart;
