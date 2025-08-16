import { InputField } from "@/components/ui/input-field";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function InputFieldShowcase() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-headline text-2xl mb-4">Variants</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Outlined</CardTitle>
              <CardDescription>The default style</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <InputField label="Name" placeholder="John Doe" variant="outlined" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Filled</CardTitle>
              <CardDescription>With a background color</CardDescription>
            </CardHeader>
            <CardContent>
              <InputField label="Email" placeholder="you@example.com" variant="filled" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Ghost</CardTitle>
              <CardDescription>Minimalist, no border</CardDescription>
            </CardHeader>
            <CardContent>
              <InputField label="Search" placeholder="Search..." variant="ghost" />
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div>
        <h3 className="font-headline text-2xl mb-4">Sizes</h3>
        <Card>
          <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <InputField label="Small" placeholder="Small size" size="sm" />
            <InputField label="Medium" placeholder="Medium size (default)" size="md" />
            <InputField label="Large" placeholder="Large size" size="lg" />
          </CardContent>
        </Card>
      </div>
      
      <div>
        <h3 className="font-headline text-2xl mb-4">States</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Invalid</CardTitle>
            </CardHeader>
            <CardContent>
              <InputField label="Email" defaultValue="invalid-email" invalid errorMessage="Please enter a valid email address." />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Disabled</CardTitle>
            </CardHeader>
            <CardContent>
              <InputField label="Name" placeholder="Can't edit this" disabled />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Loading</CardTitle>
            </CardHeader>
            <CardContent>
              <InputField label="Verifying..." loading />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>With Helper Text</CardTitle>
            </CardHeader>
            <CardContent>
                <InputField label="Username" placeholder="your_username" helperText="Your unique username for the platform." />
            </CardContent>
          </Card>
        </div>
      </div>

       <div>
        <h3 className="font-headline text-2xl mb-4">Extra Features</h3>
        <Card>
          <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <InputField label="Search" defaultValue="Some text here" clearable />
            <InputField label="Password" type="password" defaultValue="password123" showPasswordToggle />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
