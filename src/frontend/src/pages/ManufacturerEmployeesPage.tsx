import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useAddManufacturerEmployee,
  useApproveManufacturerLeave,
  useGetManufacturerEmployeeAttendance,
  useGetManufacturerEmployees,
  useGetManufacturerLeaveRequests,
  useRecordManufacturerEmployeeAttendance,
  useUpdateManufacturerEmployee,
} from "@/hooks/useBackend";
import {
  Calendar,
  CheckCircle,
  ClipboardList,
  Clock,
  LogIn,
  LogOut,
  Plus,
  UserCheck,
  Users,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const EMPLOYEE_ROLES = [
  "Sale",
  "Purchase",
  "Restock",
  "Inventory",
  "Expiry",
  "Complaints",
  "Accounts",
  "Bills",
  "General",
];

const MFR_ID = "manufacturer-1";

function EmployeesTab() {
  const { data: employees = [], isLoading } =
    useGetManufacturerEmployees(MFR_ID);
  const addEmployee = useAddManufacturerEmployee();
  const updateEmployee = useUpdateManufacturerEmployee();
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", role: "General" });

  const handleAdd = async () => {
    if (!form.name || !form.phone) {
      toast.error("Name and phone are required");
      return;
    }
    try {
      await addEmployee.mutateAsync({ manufacturerId: MFR_ID, ...form });
      toast.success("Employee added");
      setShowAdd(false);
      setForm({ name: "", phone: "", role: "General" });
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  const toggleActive = async (id: string, mfrId: string, current: boolean) => {
    try {
      await updateEmployee.mutateAsync({
        employeeId: id,
        manufacturerId: mfrId,
        isActive: !current,
      });
      toast.success(current ? "Employee deactivated" : "Employee activated");
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Team Members</h3>
        <Button
          size="sm"
          onClick={() => setShowAdd(true)}
          data-ocid="mfr-employees.add_button"
        >
          <Plus className="mr-1 h-4 w-4" /> Add Employee
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {["s1", "s2", "s3"].map((k) => (
            <Skeleton key={k} className="h-12 w-full" />
          ))}
        </div>
      ) : employees.length === 0 ? (
        <Card>
          <CardContent
            className="flex flex-col items-center gap-2 py-12 text-center"
            data-ocid="mfr-employees.empty_state"
          >
            <Users className="h-10 w-10 text-muted-foreground" />
            <p className="text-muted-foreground">
              No employees yet. Add your first team member.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Name
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Phone
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Role
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Status
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {employees.map((emp, i) => (
                <tr
                  key={emp.id}
                  className="hover:bg-muted/20"
                  data-ocid={`mfr-employees.item.${i + 1}`}
                >
                  <td className="px-4 py-3 font-medium text-foreground">
                    {emp.name}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {emp.phone}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="secondary">{emp.role}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={emp.isActive ? "default" : "outline"}>
                      {emp.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        toggleActive(emp.id, emp.manufacturerId, emp.isActive)
                      }
                      data-ocid={`mfr-employees.toggle.${i + 1}`}
                    >
                      {emp.isActive ? "Deactivate" : "Activate"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent data-ocid="mfr-employees.dialog">
          <DialogHeader>
            <DialogTitle>Add Employee</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                placeholder="Full name"
                data-ocid="mfr-employees.name_input"
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                value={form.phone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, phone: e.target.value }))
                }
                placeholder="+91 XXXXX XXXXX"
                data-ocid="mfr-employees.phone_input"
              />
            </div>
            <div>
              <Label>Role</Label>
              <Select
                value={form.role}
                onValueChange={(v) => setForm((f) => ({ ...f, role: v }))}
              >
                <SelectTrigger data-ocid="mfr-employees.role_select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {EMPLOYEE_ROLES.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAdd(false)}
                data-ocid="mfr-employees.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleAdd}
                disabled={addEmployee.isPending}
                data-ocid="mfr-employees.submit_button"
              >
                {addEmployee.isPending ? "Adding..." : "Add Employee"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function AttendanceTab() {
  const { data: employees = [] } = useGetManufacturerEmployees(MFR_ID);
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedEmp, setSelectedEmp] = useState("");
  const [showRecord, setShowRecord] = useState(false);
  const [action, setAction] = useState<"checkin" | "checkout">("checkin");
  const [notes, setNotes] = useState("");
  const recordAttendance = useRecordManufacturerEmployeeAttendance();
  const { data: records = [], isLoading } =
    useGetManufacturerEmployeeAttendance(selectedEmp, selectedDate);

  const handleRecord = async () => {
    if (!selectedEmp) {
      toast.error("Select an employee");
      return;
    }
    try {
      await recordAttendance.mutateAsync({
        employeeId: selectedEmp,
        manufacturerId: MFR_ID,
        date: selectedDate,
        action,
        notes,
      });
      toast.success(
        `${action === "checkin" ? "Check-in" : "Check-out"} recorded`,
      );
      setShowRecord(false);
      setNotes("");
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-3">
        <div>
          <Label>Date</Label>
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-40"
            data-ocid="mfr-attendance.date_input"
          />
        </div>
        <div>
          <Label>Employee</Label>
          <Select value={selectedEmp} onValueChange={setSelectedEmp}>
            <SelectTrigger
              className="w-48"
              data-ocid="mfr-attendance.employee_select"
            >
              <SelectValue placeholder="All employees" />
            </SelectTrigger>
            <SelectContent>
              {employees.map((e) => (
                <SelectItem key={e.id} value={e.id}>
                  {e.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          type="button"
          onClick={() => setShowRecord(true)}
          data-ocid="mfr-attendance.record_button"
        >
          <Clock className="mr-1 h-4 w-4" /> Record Attendance
        </Button>
      </div>

      {isLoading ? (
        <Skeleton className="h-32 w-full" />
      ) : records.length === 0 ? (
        <Card>
          <CardContent
            className="flex flex-col items-center gap-2 py-10 text-center"
            data-ocid="mfr-attendance.empty_state"
          >
            <Calendar className="h-8 w-8 text-muted-foreground" />
            <p className="text-muted-foreground">
              No attendance records for this selection.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Employee
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Check In
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Check Out
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {records.map((r, i) => (
                <tr
                  key={r.id}
                  className="hover:bg-muted/20"
                  data-ocid={`mfr-attendance.item.${i + 1}`}
                >
                  <td className="px-4 py-3">{r.employeeId}</td>
                  <td className="px-4 py-3">
                    {r.checkInTime ? (
                      <span className="flex items-center gap-1 text-green-600">
                        <LogIn className="h-3 w-3" />
                        {r.checkInTime}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {r.checkOutTime ? (
                      <span className="flex items-center gap-1 text-orange-500">
                        <LogOut className="h-3 w-3" />
                        {r.checkOutTime}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {r.notes ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={showRecord} onOpenChange={setShowRecord}>
        <DialogContent data-ocid="mfr-attendance.dialog">
          <DialogHeader>
            <DialogTitle>Record Attendance</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Employee</Label>
              <Select value={selectedEmp} onValueChange={setSelectedEmp}>
                <SelectTrigger data-ocid="mfr-attendance.dialog_employee_select">
                  <SelectValue placeholder="Select employee" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((e) => (
                    <SelectItem key={e.id} value={e.id}>
                      {e.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Action</Label>
              <Select
                value={action}
                onValueChange={(v) => setAction(v as "checkin" | "checkout")}
              >
                <SelectTrigger data-ocid="mfr-attendance.action_select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="checkin">Check In</SelectItem>
                  <SelectItem value="checkout">Check Out</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Notes (optional)</Label>
              <Input
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Optional notes"
                data-ocid="mfr-attendance.notes_input"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowRecord(false)}
                data-ocid="mfr-attendance.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleRecord}
                disabled={recordAttendance.isPending}
                data-ocid="mfr-attendance.submit_button"
              >
                {recordAttendance.isPending ? "Saving..." : "Record"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function LeaveRequestsTab() {
  const { data: leaves = [], isLoading } =
    useGetManufacturerLeaveRequests(MFR_ID);
  const approve = useApproveManufacturerLeave();

  const handleAction = async (leaveId: string, approv: boolean) => {
    try {
      await approve.mutateAsync({
        leaveId,
        manufacturerId: MFR_ID,
        approve: approv,
      });
      toast.success(approv ? "Leave approved" : "Leave rejected");
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  const statusColor: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Leave Requests</h3>
      {isLoading ? (
        <div className="space-y-2">
          {["s1", "s2", "s3"].map((k) => (
            <Skeleton key={k} className="h-16 w-full" />
          ))}
        </div>
      ) : leaves.length === 0 ? (
        <Card>
          <CardContent
            className="flex flex-col items-center gap-2 py-10 text-center"
            data-ocid="mfr-leaves.empty_state"
          >
            <ClipboardList className="h-8 w-8 text-muted-foreground" />
            <p className="text-muted-foreground">No leave requests found.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {leaves.map((l, i) => (
            <Card key={l.id} data-ocid={`mfr-leaves.item.${i + 1}`}>
              <CardContent className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">
                      {l.employeeName}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColor[l.status] ?? ""}`}
                    >
                      {l.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {l.leaveType} · {l.startDate} to {l.endDate}
                  </p>
                  <p className="text-sm text-foreground">{l.reason}</p>
                </div>
                {l.status === "pending" && (
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="border-green-500 text-green-600 hover:bg-green-50"
                      onClick={() => handleAction(l.id, true)}
                      data-ocid={`mfr-leaves.approve_button.${i + 1}`}
                    >
                      <CheckCircle className="mr-1 h-3 w-3" /> Approve
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="border-red-400 text-red-500 hover:bg-red-50"
                      onClick={() => handleAction(l.id, false)}
                      data-ocid={`mfr-leaves.reject_button.${i + 1}`}
                    >
                      <XCircle className="mr-1 h-3 w-3" /> Reject
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ManufacturerEmployeesPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-primary/10 p-2">
          <UserCheck className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Employee Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage team, attendance, and leave requests
          </p>
        </div>
      </div>

      <Tabs defaultValue="employees" className="space-y-4">
        <TabsList data-ocid="mfr-employees.tab">
          <TabsTrigger value="employees">
            <Users className="mr-1 h-4 w-4" />
            Employees
          </TabsTrigger>
          <TabsTrigger value="attendance">
            <Clock className="mr-1 h-4 w-4" />
            Attendance
          </TabsTrigger>
          <TabsTrigger value="leaves">
            <ClipboardList className="mr-1 h-4 w-4" />
            Leave Requests
          </TabsTrigger>
        </TabsList>

        <TabsContent value="employees">
          <Card>
            <CardContent className="pt-6">
              <EmployeesTab />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="attendance">
          <Card>
            <CardContent className="pt-6">
              <AttendanceTab />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="leaves">
          <Card>
            <CardContent className="pt-6">
              <LeaveRequestsTab />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
