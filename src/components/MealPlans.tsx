import { Edit, Users } from "lucide-react";
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

const mealPlans = [
  { id: 1, name: "Keto Power", category: "Low Carb", calories: 1800, assignedUsers: 342, color: "bg-purple-500" },
  { id: 2, name: "Mediterranean Diet", category: "Balanced", calories: 2000, assignedUsers: 289, color: "bg-blue-500" },
  { id: 3, name: "High Protein", category: "Muscle Gain", calories: 2200, assignedUsers: 256, color: "bg-red-500" },
  { id: 4, name: "Vegan Balanced", category: "Plant-Based", calories: 1900, assignedUsers: 198, color: "bg-green-500" },
  { id: 5, name: "Intermittent Fasting", category: "Fasting", calories: 1600, assignedUsers: 187, color: "bg-orange-500" },
  { id: 6, name: "Paleo Diet", category: "Whole Foods", calories: 2100, assignedUsers: 156, color: "bg-amber-500" },
  { id: 7, name: "Low Calorie", category: "Weight Loss", calories: 1400, assignedUsers: 234, color: "bg-pink-500" },
  { id: 8, name: "Athlete Performance", category: "High Energy", calories: 2800, assignedUsers: 123, color: "bg-cyan-500" },
];

export function MealPlans() {
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

      {/* Desktop Table View */}
      <Card className="border-slate-200 hidden md:block">
        <CardHeader>
          <CardTitle className="text-slate-900">All Meal Plans</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plan Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Calories</TableHead>
                <TableHead>Assigned Users</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mealPlans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${plan.color} flex items-center justify-center text-white`}>
                        {plan.name.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="text-slate-900">{plan.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-slate-300 text-slate-700">
                      {plan.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-600">{plan.calories} kcal</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Users className="w-4 h-4" />
                      <span>{plan.assignedUsers}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {mealPlans.map((plan) => (
          <Card key={plan.id} className="border-slate-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className={`w-14 h-14 rounded-xl ${plan.color} flex items-center justify-center text-white shrink-0`}>
                  {plan.name.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-900 mb-1">{plan.name}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="outline" className="border-slate-300 text-slate-700">
                      {plan.category}
                    </Badge>
                    <span className="text-slate-600 px-2 py-1 bg-slate-100 rounded">
                      {plan.calories} kcal
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-slate-600">
                      <Users className="w-4 h-4" />
                      <span>{plan.assignedUsers} users</span>
                    </div>
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
