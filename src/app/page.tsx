import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InputFieldShowcase } from "@/components/input-field-showcase";
import { DataTableShowcase } from "@/components/data-table-showcase";
import { ComponentCanvasLogo } from "@/components/component-canvas-logo";
import { Component, Table } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-background">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <ComponentCanvasLogo className="h-8 w-8 text-primary" />
            <h1 className="font-headline text-2xl font-bold text-foreground">
              Component Canvas
            </h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6 lg:p-8">
        <Tabs defaultValue="input-field" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:w-auto md:grid-cols-2">
            <TabsTrigger value="input-field">
              <Component className="mr-2 h-4 w-4" />
              InputField
            </TabsTrigger>
            <TabsTrigger value="data-table">
              <Table className="mr-2 h-4 w-4" />
              DataTable
            </TabsTrigger>
          </TabsList>

          <TabsContent value="input-field" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-3xl">InputField Component</CardTitle>
              </CardHeader>
              <CardContent>
                <InputFieldShowcase />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data-table" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-3xl">DataTable Component</CardTitle>
              </CardHeader>
              <CardContent>
                <DataTableShowcase />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
