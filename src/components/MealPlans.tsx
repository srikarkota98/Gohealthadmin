import { Edit, Users, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useEffect, useState } from "react";
import api from "../utils/axios";

interface DayPlan {
  lunch: string;
  dinner: string;
  breakfast: string;
  ingredients: string;
  total_calories: string;
}

interface MealPlanResponse {
  me_id: number;
  gh_id: string;
  user_gh_id?: string;
  user_full_name: string;
  user_category: string;
  me_plan: Record<string, DayPlan>; // keys like "day6", "day7", etc.
  user_question_data: Record<string, any>;
  createdAt: string;
}

export function MealPlans() {
  const [plans, setPlans] = useState<MealPlanResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<MealPlanResponse | null>(
    null
  );

  useEffect(() => {
    api
      .post("user/meal-data")
      .then((response) => {
        console.log("Meal Plans API Response:", response.data);

        let data: any[] = [];

        if (Array.isArray(response.data)) {
          // Plain array
          data = response.data;
        } else if (Array.isArray(response.data?.data)) {
          // Your case: response.data = { data: [...] }
          data = response.data.data;
        } else if (
          response.data?.data?.mealPlans &&
          Array.isArray(response.data.data.mealPlans)
        ) {
          // Nested under data.mealPlans
          data = response.data.data.mealPlans;
        } else {
          console.warn("Unexpected meal plans API structure:", response.data);
        }

        // Normalize GH ID so it always lands in gh_id
        const normalized: MealPlanResponse[] = data.map((item, index) => ({
          ...item,
          gh_id:
            item.gh_id ??
            item.ghid ??
            item.ghId ??
            item.GHID ??
            item.gohealth_id ??
            item.gohealthId ??
            "",
        }));

        setPlans(normalized);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching meal plans:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load meal plans"
        );
        setLoading(false);
      });
  }, []);

  const getFirstDayCalories = (me_plan: Record<string, DayPlan>): string => {
    const dayKeys = Object.keys(me_plan || {});
    if (dayKeys.length === 0) return "N/A";
    const firstDay = me_plan[dayKeys[0]];
    return firstDay?.total_calories || "N/A";
  };

  const getPlanInitials = (name: string): string => {
    return name
      .split(" ")
      .filter((n) => n && n.length > 0)
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const colorClasses = [
    "bg-purple-500",
    "bg-blue-500",
    "bg-red-500",
    "bg-green-500",
    "bg-orange-500",
    "bg-amber-500",
    "bg-pink-500",
    "bg-cyan-500",
  ];

  const getColorForIndex = (index: number) =>
    colorClasses[index % colorClasses.length];

  const handleViewPlan = (plan: MealPlanResponse) => {
    // Show full me_plan data immediately in a popup
    if (plan.me_plan) {
      alert(JSON.stringify(plan.me_plan, null, 2));
    } else {
      alert("No meal plan data available for this user.");
    }

    // Also keep overlay state, in case you want the detailed UI view
    console.log("Selected meal plan:", plan);
    setSelectedPlan(plan);
  };

  const handleViewUserQuestionData = (plan: MealPlanResponse) => {
    if (plan.user_question_data) {
      alert(JSON.stringify(plan.user_question_data, null, 2));
    } else {
      alert("No user question data available for this user.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-slate-900 mb-1">Meal Plans</h2>
          <p className="text-slate-500">Manage all available meal plans and their assignments.</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 hidden md:flex">
          Create New Plan
        </Button>
      </div>

      {/* Error state */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <p className="text-red-600">Error loading meal plans: {error}</p>
          </CardContent>
        </Card>
      )}

      {/* Loading state */}
      {loading && !error && (
        <Card className="border-slate-200">
          <CardContent className="p-8 text-center">
            <p className="text-slate-600">Loading meal plans...</p>
          </CardContent>
        </Card>
      )}

      {/* Desktop Table View */}
      {!loading && !error && (
        <Card className="border-slate-200 hidden md:block">
          <CardHeader>
            <CardTitle className="text-slate-900">All Meal Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Meal ID</TableHead>
                  <TableHead>GH ID</TableHead>
                  <TableHead>User Full Name</TableHead>
                  <TableHead>User Category</TableHead>
                  <TableHead>Meal Plan</TableHead>
                  <TableHead>User Question Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {plans.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center text-slate-500 py-8"
                    >
                      No meal plans found
                    </TableCell>
                  </TableRow>
                ) : (
                  plans.map((plan, index) => {
                    return (
                      <TableRow key={plan.me_id}>
                        <TableCell className="text-slate-600">
                          {plan.me_id}
                        </TableCell>
                        <TableCell className="text-slate-600">
                          {plan.user_gh_id}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-lg ${getColorForIndex(
                                index
                              )} flex items-center justify-center text-white`}
                            >
                              {getPlanInitials(plan.user_full_name)}
                            </div>
                            <span className="text-slate-900">
                              {plan.user_full_name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="border-slate-300 text-slate-700"
                          >
                            {plan.user_category}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-600">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewPlan(plan)}
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </TableCell>
                        <TableCell className="text-slate-600 text-sm">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewUserQuestionData(plan)}
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Mobile Card View */}
      {!loading && !error && (
        <div className="md:hidden space-y-3">
          {plans.length === 0 ? (
            <Card className="border-slate-200">
              <CardContent className="p-8 text-center">
                <p className="text-slate-500">No meal plans found</p>
              </CardContent>
            </Card>
          ) : (
            plans.map((plan, index) => {
              return (
                <Card key={plan.me_id} className="border-slate-200">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-14 h-14 rounded-xl ${getColorForIndex(
                          index
                        )} flex items-center justify-center text-white shrink-0`}
                      >
                        {getPlanInitials(plan.user_full_name)}
                      </div>
                      <div className="flex-1 min-w-0 space-y-1">
                        <p className="text-slate-900 font-medium">
                          {plan.user_full_name}
                        </p>
                        <p className="text-slate-600 text-sm">
                          ME ID: <span className="font-mono">{plan.me_id}</span>
                        </p>
                        <p className="text-slate-600 text-sm">
                          GH ID:{" "}
                          <span className="font-mono">{plan.user_gh_id}</span>
                        </p>
                        <Badge
                          variant="outline"
                          className="border-slate-300 text-slate-700 text-xs"
                        >
                          {plan.user_category}
                        </Badge>
                        <div className="pt-2 space-y-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full"
                            onClick={() => handleViewPlan(plan)}
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            View full plan
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full"
                            onClick={() => handleViewUserQuestionData(plan)}
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            View user question data
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      )}

      {/* Full me_plan view overlay */}
      {selectedPlan && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[1000]">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[85vh] overflow-auto p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">
                  Meal Plan for {selectedPlan.user_full_name}
                </h3>
                <p className="text-slate-500 text-sm">
                  ME ID:{" "}
                  <span className="font-mono">{selectedPlan.me_id}</span>
                  {selectedPlan.user_gh_id && (
                    <>
                      {" "}
                      • GH ID:{" "}
                      <span className="font-mono">
                        {selectedPlan.user_gh_id}
                      </span>
                    </>
                  )}
                </p>
              </div>
              <button
                type="button"
                className="rounded-full p-1.5 hover:bg-slate-100 text-slate-500"
                onClick={() => setSelectedPlan(null)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {Object.entries(selectedPlan.me_plan || {}).map(
                ([dayKey, dayValue]) => (
                  <Card key={dayKey} className="border-slate-200">
                    <CardHeader className="py-3 px-4">
                      <CardTitle className="text-sm text-slate-900">
                        {dayKey.toUpperCase()}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pb-4 space-y-2 text-sm text-slate-700">
                      <p>
                        <span className="font-semibold">Breakfast:</span>{" "}
                        {dayValue.breakfast}
                      </p>
                      <p>
                        <span className="font-semibold">Lunch:</span>{" "}
                        {dayValue.lunch}
                      </p>
                      <p>
                        <span className="font-semibold">Dinner:</span>{" "}
                        {dayValue.dinner}
                      </p>
                      <p>
                        <span className="font-semibold">Ingredients:</span>{" "}
                        {dayValue.ingredients}
                      </p>
                      <p className="text-slate-600 font-medium">
                        Total calories: {dayValue.total_calories}
                      </p>
                    </CardContent>
                  </Card>
                )
              )}

              {/* Raw me_plan JSON for debugging / full key visibility */}
              <Card className="border-slate-200">
                <CardHeader className="py-3 px-4">
                  <CardTitle className="text-sm text-slate-900">
                    Raw me_plan data
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <pre className="text-xs text-slate-700 whitespace-pre-wrap break-words bg-slate-50 rounded p-3">
                    {JSON.stringify(selectedPlan.me_plan, null, 2)}
                  </pre>
                </CardContent>
              </Card>
            </div>

            <div className="mt-4 flex justify-end">
              <Button variant="outline" onClick={() => setSelectedPlan(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
