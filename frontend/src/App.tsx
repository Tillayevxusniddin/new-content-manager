import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "@/lib/auth-context";
import { AppShell } from "@/components/layout/AppLayout";
import { AdminLayout } from "@/components/layout/AdminLayout";
import RouteGuard from "@/components/layout/RouteGuard";
import { HomePage } from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import { BooksPage } from "@/pages/BooksPage";
import { BookDetailPage } from "@/pages/BookDetailPage";
import { AdminDashboardPage } from "@/pages/AdminDashboardPage";
import { AdminBooksPage } from "@/pages/AdminBooksPage";
import { AdminBookEditorPage } from "@/pages/AdminBookEditorPage";
import { AdminCategoriesPage } from "@/pages/AdminCategoriesPage";
import { AdminSettingsPage } from "@/pages/AdminSettingsPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            element={
              <RouteGuard>
                <AppShell />
              </RouteGuard>
            }
          >
            <Route path="/" element={<HomePage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/books/:id" element={<BookDetailPage />} />
          </Route>
          <Route
            element={
              <RouteGuard allow={["admin"]}>
                <AdminLayout />
              </RouteGuard>
            }
          >
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/books" element={<AdminBooksPage />} />
            <Route path="/admin/books/new" element={<AdminBookEditorPage mode="create" />} />
            <Route path="/admin/books/:id" element={<AdminBookEditorPage mode="edit" />} />
            <Route path="/admin/categories" element={<AdminCategoriesPage />} />
            <Route path="/admin/settings" element={<AdminSettingsPage />} />
          </Route>
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
