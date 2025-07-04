"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAppSelector } from "@/hooks/store-hook";

export default function ChekoutPage() {
  const { selectedCartItems } = useAppSelector((state) => state.checkout);

  return (
    <div>
      <div>
        {selectedCartItems.map((item) => (
          <div key={item.cartItemId}>
            <p>{item.painting.name}</p>
            <p>Số lượng: {item.quantity}</p>
            <p>Giá: ¥{item.painting.price.toLocaleString("ja-JP")}</p>
          </div>
        ))}
      </div>

      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Upgrade your subscription</CardTitle>
          <CardDescription>
            You are currently on the free plan. Upgrade to the pro plan to get
            access to all features.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="Name" defaultValue="Evil Rabbit" />
            <Input placeholder="Email" defaultValue="example@acme.co" />
          </div>

          <div className="grid grid-cols-4 gap-4">
            <Input placeholder="1234 1234 1234 1234" className="col-span-2" />
            <Input placeholder="MM/YY" />
            <Input placeholder="CVC" />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">Plan</label>
            <p className="text-sm text-muted-foreground">
              Select the plan that best fits your needs.
            </p>
            <RadioGroup
              defaultValue="starter"
              className="grid grid-cols-2 gap-4 pt-2"
            >
              <div className="border rounded-lg p-4">
                <RadioGroupItem value="starter" id="starter" />
                <label htmlFor="starter" className="ml-2 font-medium">
                  Starter Plan
                </label>
                <p className="text-sm text-muted-foreground">
                  Perfect for small businesses.
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <RadioGroupItem value="pro" id="pro" />
                <label htmlFor="pro" className="ml-2 font-medium">
                  Pro Plan
                </label>
                <p className="text-sm text-muted-foreground">
                  More features and storage.
                </p>
              </div>
            </RadioGroup>
          </div>

          <Textarea placeholder="Enter notes" />

          <div className="grid gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label htmlFor="terms" className="text-sm">
                I agree to the terms and conditions
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="emails" defaultChecked />
              <label htmlFor="emails" className="text-sm">
                Allow us to send you emails
              </label>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Upgrade Plan</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
