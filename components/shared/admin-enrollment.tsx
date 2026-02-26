// app/admin/enrollments/page.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  Loader2,
  ArrowLeft,
  Receipt,
  User,
  Calendar,
  CreditCard,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Clock,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

const statusColors = {
  pending: "bg-amber-100 text-amber-700 border-amber-200",
  confirmed: "bg-blue-100 text-blue-700 border-blue-200",
  active: "bg-green-100 text-green-700 border-green-200",
  completed: "bg-purple-100 text-purple-700 border-purple-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
};

const paymentStatusColors = {
  pending: "bg-amber-100 text-amber-700",
  verified: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

export default function AdminEnrollmentsPage() {
  const searchParams = useSearchParams();
  const preselectedId = searchParams.get("id");

  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: "",
    paymentStatus: "",
    search: "",
    page: 1,
    limit: 20,
  });
  const [pagination, setPagination] = useState({ total: 0, pages: 0 });
  const [stats, setStats] = useState({ totalAmount: 0, verifiedAmount: 0 });

  const [selectedEnrollment, setSelectedEnrollment] = useState<any>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [actionModal, setActionModal] = useState<{
    type: "verify" | "reject" | null;
    enrollment: any | null;
  }>({ type: null, enrollment: null });
  const [rejectionReason, setRejectionReason] = useState("");
  const [processing, setProcessing] = useState(false);

  // Auto-open if ID in URL
  useEffect(() => {
    if (preselectedId) {
      fetchEnrollmentDetails(preselectedId);
    }
  }, [preselectedId]);

  const fetchEnrollments = useCallback(async () => {
    setLoading(true);
    const query = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) query.append(key, String(value));
    });

    const res = await fetch(`/api/admin/enrollments?${query}`);
    const data = await res.json();

    if (data.success) {
      setEnrollments(data.data);
      setPagination({
        total: data.pagination.total,
        pages: data.pagination.pages,
      });
      setStats(data.stats);
    }
    setLoading(false);
  }, [filters]);

  useEffect(() => {
    fetchEnrollments();
  }, [fetchEnrollments]);

  const fetchEnrollmentDetails = async (id: string) => {
    const res = await fetch(`/api/admin/enrollments/${id}`);
    const data = await res.json();
    if (data.success) {
      setSelectedEnrollment(data.data);
      setViewModalOpen(true);
    }
  };

  const handleAction = async () => {
    if (!actionModal.enrollment || !actionModal.type) return;

    setProcessing(true);
    const res = await fetch(
      `/api/admin/enrollments/${actionModal.enrollment._id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: actionModal.type,
          notes: rejectionReason,
          adminName: "Admin", // Get from auth context
        }),
      },
    );

    const data = await res.json();
    if (data.success) {
      setActionModal({ type: null, enrollment: null });
      setRejectionReason("");
      fetchEnrollments();
      if (viewModalOpen) setViewModalOpen(false);
    }
    setProcessing(false);
  };

  const exportCSV = () => {
    const headers = [
      "Enrollment ID",
      "Student Name",
      "Email",
      "Course",
      "Amount",
      "Status",
      "Date",
    ];
    const rows = enrollments.map((e) => [
      e.enrollmentId,
      `${e.student.firstName} ${e.student.lastName}`,
      e.student.email,
      e.course.title,
      e.payment.amount,
      e.status,
      new Date(e.createdAt).toLocaleDateString(),
    ]);

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `enrollments-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Enrollments</h2>
          <p className="text-muted-foreground">
            Manage and verify student enrollments
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportCSV}>
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Amount (Filtered)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              PKR {stats.totalAmount.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Verified Amount
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              PKR {stats.verifiedAmount.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Amount
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              PKR {(stats.totalAmount - stats.verifiedAmount).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, enrollment ID..."
                className="pl-10"
                value={filters.search}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    search: e.target.value,
                    page: 1,
                  }))
                }
              />
            </div>
            <Select
              value={filters.status}
              onValueChange={(v) =>
                setFilters((prev) => ({ ...prev, status: v, page: 1 }))
              }
            >
              <SelectTrigger className="w-45">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={filters.paymentStatus}
              onValueChange={(v) =>
                setFilters((prev) => ({ ...prev, paymentStatus: v, page: 1 }))
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Payment Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payments</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="text-left p-4 font-medium">Student</th>
                  <th className="text-left p-4 font-medium">Course</th>
                  <th className="text-left p-4 font-medium">Amount</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Date</th>
                  <th className="text-right p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                    </td>
                  </tr>
                ) : enrollments.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="p-8 text-center text-muted-foreground"
                    >
                      No enrollments found
                    </td>
                  </tr>
                ) : (
                  enrollments.map((enrollment) => (
                    <tr
                      key={enrollment._id}
                      className="border-b border-border hover:bg-muted/30 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold">
                            {enrollment.student.firstName[0]}
                            {enrollment.student.lastName[0]}
                          </div>
                          <div>
                            <p className="font-medium">
                              {enrollment.student.firstName}{" "}
                              {enrollment.student.lastName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {enrollment.student.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="font-medium">{enrollment.course.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {enrollment.course.level}
                        </p>
                      </td>
                      <td className="p-4">
                        <p className="font-semibold">
                          PKR {enrollment.payment.amount.toLocaleString()}
                        </p>
                        <Badge
                          variant="outline"
                          className={
                            paymentStatusColors[
                              enrollment.payment
                                .status as keyof typeof paymentStatusColors
                            ]
                          }
                        >
                          {enrollment.payment.status}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge
                          className={
                            statusColors[
                              enrollment.status as keyof typeof statusColors
                            ]
                          }
                        >
                          {enrollment.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {new Date(enrollment.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedEnrollment(enrollment);
                              setViewModalOpen(true);
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>

                          {enrollment.status === "pending" && (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-green-600 hover:text-green-700 hover:bg-green-100"
                                onClick={() =>
                                  setActionModal({ type: "verify", enrollment })
                                }
                              >
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-600 hover:text-red-700 hover:bg-red-100"
                                onClick={() =>
                                  setActionModal({ type: "reject", enrollment })
                                }
                              >
                                <XCircle className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between p-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Showing {enrollments.length} of {pagination.total} enrollments
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={filters.page === 1}
                onClick={() =>
                  setFilters((prev) => ({ ...prev, page: prev.page - 1 }))
                }
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={filters.page >= pagination.pages}
                onClick={() =>
                  setFilters((prev) => ({ ...prev, page: prev.page + 1 }))
                }
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* View Details Modal */}
      <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
          {selectedEnrollment && (
            <>
              <div
                className={`h-24 bg-gradient-to-r ${
                  selectedEnrollment.course.level === "Beginner"
                    ? "from-emerald-500 to-teal-600"
                    : selectedEnrollment.course.level === "Intermediate"
                      ? "from-blue-500 to-indigo-600"
                      : "from-violet-500 to-purple-600"
                } relative`}
              >
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/50 to-transparent">
                  <div className="flex items-end gap-4">
                    <span className="text-4xl">
                      {selectedEnrollment.course.level === "Beginner"
                        ? "🌱"
                        : selectedEnrollment.course.level === "Intermediate"
                          ? "🚀"
                          : "👑"}
                    </span>
                    <div>
                      <Badge className="bg-white/20 text-white mb-1">
                        {selectedEnrollment.enrollmentId}
                      </Badge>
                      <h2 className="text-xl font-bold text-white">
                        {selectedEnrollment.course.title}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 overflow-y-auto max-h-[calc(90vh-6rem)]">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Student Info */}
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      Student Information
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Full Name</span>
                        <span className="font-medium">
                          {selectedEnrollment.student.firstName}{" "}
                          {selectedEnrollment.student.lastName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email</span>
                        <span className="font-medium">
                          {selectedEnrollment.student.email}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Phone</span>
                        <span className="font-medium">
                          {selectedEnrollment.student.phone}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">CNIC</span>
                        <span className="font-medium">
                          {selectedEnrollment.student.cnic}
                        </span>
                      </div>
                      <Separator />
                      <div>
                        <span className="text-muted-foreground block mb-1">
                          Address
                        </span>
                        <span className="font-medium">
                          {selectedEnrollment.student.address},{" "}
                          {selectedEnrollment.student.city}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Education</span>
                        <span className="font-medium">
                          {selectedEnrollment.student.education}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Experience
                        </span>
                        <Badge variant="outline" className="capitalize">
                          {selectedEnrollment.student.experience}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-primary" />
                      Payment Details
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Method</span>
                        <Badge variant="outline" className="capitalize">
                          {selectedEnrollment.payment.method.replace("_", " ")}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Amount</span>
                        <span className="font-bold text-lg">
                          PKR{" "}
                          {selectedEnrollment.payment.amount.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Transaction ID
                        </span>
                        <span className="font-medium font-mono">
                          {selectedEnrollment.payment.transactionId}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status</span>
                        <Badge
                          className={
                            paymentStatusColors[
                              selectedEnrollment.payment
                                .status as keyof typeof paymentStatusColors
                            ]
                          }
                        >
                          {selectedEnrollment.payment.status}
                        </Badge>
                      </div>
                      {selectedEnrollment.payment.verifiedAt && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Verified At
                          </span>
                          <span>
                            {new Date(
                              selectedEnrollment.payment.verifiedAt,
                            ).toLocaleString()}
                          </span>
                        </div>
                      )}

                      {/* Receipt Image */}
                      <div className="mt-4">
                        <p className="text-muted-foreground mb-2">
                          Payment Receipt
                        </p>
                        <a
                          href={selectedEnrollment.payment.receiptUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block relative aspect-video rounded-lg overflow-hidden border border-border hover:opacity-90 transition-opacity"
                        >
                          <img
                            src={selectedEnrollment.payment.receiptUrl}
                            alt="Payment Receipt"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity">
                            <span className="text-white font-medium">
                              View Full Size
                            </span>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Course & Enrollment Info */}
                <div className="grid md:grid-cols-3 gap-6 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Course Level</p>
                    <Badge>{selectedEnrollment.course.level}</Badge>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Duration</p>
                    <p className="font-medium">
                      {selectedEnrollment.course.duration}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">
                      Preferred Batch
                    </p>
                    <Badge variant="outline" className="capitalize">
                      {selectedEnrollment.preferredBatch}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">
                      Enrollment Date
                    </p>
                    <p className="font-medium">
                      {new Date(selectedEnrollment.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">
                      Enrollment Status
                    </p>
                    <Badge
                      className={
                        statusColors[
                          selectedEnrollment.status as keyof typeof statusColors
                        ]
                      }
                    >
                      {selectedEnrollment.status}
                    </Badge>
                  </div>
                  {selectedEnrollment.message && (
                    <div className="md:col-span-3">
                      <p className="text-muted-foreground mb-1">
                        Student Message
                      </p>
                      <p className="font-medium italic">
                        "{selectedEnrollment.message}"
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer Actions */}
              {selectedEnrollment.status === "pending" && (
                <div className="p-6 border-t border-border bg-muted/30 flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() =>
                      setActionModal({
                        type: "reject",
                        enrollment: selectedEnrollment,
                      })
                    }
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                  <Button
                    onClick={() =>
                      setActionModal({
                        type: "verify",
                        enrollment: selectedEnrollment,
                      })
                    }
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Verify Payment
                  </Button>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Action Confirmation Modal */}
      <Dialog
        open={!!actionModal.type}
        onOpenChange={() => setActionModal({ type: null, enrollment: null })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionModal.type === "verify"
                ? "Verify Payment"
                : "Reject Enrollment"}
            </DialogTitle>
            <DialogDescription>
              {actionModal.type === "verify"
                ? "Are you sure you want to verify this payment? The student will be notified and granted course access."
                : "Please provide a reason for rejecting this enrollment. The student will be notified."}
            </DialogDescription>
          </DialogHeader>

          {actionModal.type === "reject" && (
            <Textarea
              placeholder="Reason for rejection..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="mt-4"
            />
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setActionModal({ type: null, enrollment: null })}
              disabled={processing}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAction}
              disabled={
                processing ||
                (actionModal.type === "reject" && !rejectionReason)
              }
              variant={
                actionModal.type === "verify" ? "default" : "destructive"
              }
              className={
                actionModal.type === "verify"
                  ? "bg-green-600 hover:bg-green-700"
                  : ""
              }
            >
              {processing ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : actionModal.type === "verify" ? (
                <CheckCircle className="w-4 h-4 mr-2" />
              ) : (
                <XCircle className="w-4 h-4 mr-2" />
              )}
              {actionModal.type === "verify" ? "Verify" : "Reject"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
