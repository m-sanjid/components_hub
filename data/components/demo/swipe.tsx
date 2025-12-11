"use client";

import { useState } from "react";
import { Swipe } from "../code/swipe";
import {
  Archive,
  Check,
  Power,
  ShoppingCart,
  Star,
  Trash2,
  X,
  Lock,
  Unlock,
  Heart,
  VolumeX,
  Volume2,
  Send,
  Download,
} from "lucide-react";

export default function SwipeDemo() {
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New message from John", time: "2 min ago" },
    { id: 2, title: "Meeting reminder", time: "5 min ago" },
    { id: 3, title: "App update available", time: "1 hour ago" },
  ]);

  const [isLocked, setIsLocked] = useState(true);
  const [isPoweredOn, setIsPoweredOn] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [cartItems, setCartItems] = useState(3);
  const [isLiked, setIsLiked] = useState(false);

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="mx-auto w-full max-w-4xl space-y-12 p-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
          Swipe-to-Confirm Use Cases
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Explore different scenarios where swipe gestures enhance user
          experience
        </p>
      </div>

      {/* Notifications */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          📱 Notification Management
        </h2>
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900"
            >
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                    {notification.title}
                  </h3>
                  <p className="text-sm text-neutral-500">
                    {notification.time}
                  </p>
                </div>
              </div>
              <Swipe
                confirmText="Archive"
                dismissText="Delete"
                neutralText="Swipe to manage"
                confirmIcon={Archive}
                dismissIcon={Trash2}
                confirmColor="blue"
                dismissColor="red"
                onConfirm={() => console.log(`Archived: ${notification.title}`)}
                onDismiss={() => removeNotification(notification.id)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Social Actions */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          ❤️ Social Interactions
        </h2>
        <div className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400"></div>
              <div>
                <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                  @designer_jane
                </h3>
                <p className="text-sm text-neutral-500">Posted a new design</p>
              </div>
            </div>
            <div className="h-48 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900"></div>
            <Swipe
              confirmText="Like"
              dismissText="Skip"
              neutralText="Swipe to react"
              confirmIcon={Heart}
              dismissIcon={X}
              confirmColor="pink"
              dismissColor="gray"
              onConfirm={() => setIsLiked(!isLiked)}
              onDismiss={() => console.log("Skipped post")}
            />
          </div>
        </div>
      </section>

      {/* E-commerce */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          🛒 E-commerce Actions
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900">
            <div className="space-y-4">
              <div className="h-32 rounded-lg bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900 dark:to-red-900"></div>
              <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                Premium Headphones
              </h3>
              <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                $199
              </p>
              <Swipe
                confirmText="Add to Cart"
                dismissText="Wishlist"
                neutralText="Swipe to shop"
                confirmIcon={ShoppingCart}
                dismissIcon={Star}
                confirmColor="green"
                dismissColor="orange"
                onConfirm={() => setCartItems((prev) => prev + 1)}
                onDismiss={() => console.log("Added to wishlist")}
              />
            </div>
          </div>

          <div className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900">
            <h3 className="mb-4 font-medium text-neutral-900 dark:text-neutral-100">
              Checkout ({cartItems} items)
            </h3>
            <div className="mb-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${cartItems * 199}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <hr className="border-neutral-200 dark:border-neutral-700" />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${cartItems * 199}</span>
              </div>
            </div>
            <Swipe
              confirmText="Pay Now"
              dismissText="Cancel"
              neutralText="Swipe to purchase"
              confirmIcon={Check}
              dismissIcon={X}
              confirmColor="green"
              dismissColor="red"
              onConfirm={() => console.log("Payment processed")}
              onDismiss={() => console.log("Order cancelled")}
            />
          </div>
        </div>
      </section>

      {/* System Controls */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          ⚙️ System Controls
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900">
            <div className="mb-4 text-center">
              <Power className="mx-auto mb-2 h-8 w-8 text-neutral-600 dark:text-neutral-400" />
              <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                Power
              </h3>
              <p className="text-sm text-neutral-500">
                Device is {isPoweredOn ? "ON" : "OFF"}
              </p>
            </div>
            <Swipe
              confirmText="Power On"
              dismissText="Shutdown"
              neutralText="Swipe to toggle"
              confirmIcon={Power}
              dismissIcon={Power}
              confirmColor="green"
              dismissColor="red"
              size="small"
              onConfirm={() => setIsPoweredOn(true)}
              onDismiss={() => setIsPoweredOn(false)}
            />
          </div>

          <div className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900">
            <div className="mb-4 text-center">
              {isLocked ? (
                <Lock className="mx-auto mb-2 h-8 w-8 text-neutral-600 dark:text-neutral-400" />
              ) : (
                <Unlock className="mx-auto mb-2 h-8 w-8 text-neutral-600 dark:text-neutral-400" />
              )}
              <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                Security
              </h3>
              <p className="text-sm text-neutral-500">
                Device is {isLocked ? "LOCKED" : "UNLOCKED"}
              </p>
            </div>
            <Swipe
              confirmText="Unlock"
              dismissText="Lock"
              neutralText="Swipe to secure"
              confirmIcon={Unlock}
              dismissIcon={Lock}
              confirmColor="blue"
              dismissColor="orange"
              size="small"
              onConfirm={() => setIsLocked(false)}
              onDismiss={() => setIsLocked(true)}
            />
          </div>

          <div className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900">
            <div className="mb-4 text-center">
              {isMuted ? (
                <VolumeX className="mx-auto mb-2 h-8 w-8 text-neutral-600 dark:text-neutral-400" />
              ) : (
                <Volume2 className="mx-auto mb-2 h-8 w-8 text-neutral-600 dark:text-neutral-400" />
              )}
              <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                Audio
              </h3>
              <p className="text-sm text-neutral-500">
                Sound is {isMuted ? "MUTED" : "ON"}
              </p>
            </div>
            <Swipe
              confirmText="Unmute"
              dismissText="Mute"
              neutralText="Swipe for sound"
              confirmIcon={Volume2}
              dismissIcon={VolumeX}
              confirmColor="purple"
              dismissColor="red"
              size="small"
              onConfirm={() => setIsMuted(false)}
              onDismiss={() => setIsMuted(true)}
            />
          </div>
        </div>
      </section>

      {/* Communication */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          💬 Communication
        </h2>
        <div className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900">
          <div className="space-y-4">
            <div className="rounded-lg bg-neutral-100 p-4 dark:bg-neutral-800">
              <p className="text-neutral-900 dark:text-neutral-100">
                Hey! Are you free for a call later today? I wanted to discuss
                the project details with you.
              </p>
              <div className="mt-2 flex items-center space-x-2">
                <div className="h-6 w-6 rounded-full bg-blue-500"></div>
                <span className="text-sm text-neutral-500">Alex • 2:34 PM</span>
              </div>
            </div>
            <Swipe
              confirmText="Send Reply"
              dismissText="Mark Read"
              neutralText="Swipe to respond"
              confirmIcon={Send}
              dismissIcon={Check}
              confirmColor="blue"
              dismissColor="green"
              onConfirm={() => console.log("Reply sent")}
              onDismiss={() => console.log("Marked as read")}
            />
          </div>
        </div>
      </section>

      {/* File Management */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          📁 File Management
        </h2>
        <div className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                <Download className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                  presentation.pdf
                </h3>
                <p className="text-sm text-neutral-500">
                  2.4 MB • Downloaded 5 min ago
                </p>
              </div>
            </div>
            <Swipe
              confirmText="Open File"
              dismissText="Delete"
              neutralText="Swipe to manage"
              confirmIcon={Download}
              dismissIcon={Trash2}
              confirmColor="blue"
              dismissColor="red"
              onConfirm={() => console.log("Opening file")}
              onDismiss={() => console.log("File deleted")}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
