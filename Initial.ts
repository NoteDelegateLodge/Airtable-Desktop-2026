type OrderStatus = "pending" | "processing" | "completed" | "cancelled";

interface Order {
    id: number;
    customer: string;
    items: string[];
    total: number;
    status: OrderStatus;
}

class OrderManager {
    private orders: Order[] = [];

    addOrder(order: Order): void {
        this.orders.push(order);
    }

    updateStatus(id: number, status: OrderStatus): void {
        const order = this.orders.find(order => order.id === id);

        if (order) {
            order.status = status;
        }
    }

    getRevenue(): number {
        return this.orders
            .filter(order => order.status === "completed")
            .reduce((sum, order) => sum + order.total, 0);
    }

    showReport(): void {
        console.log("Order Manager");
        console.log("=============");

        for (const order of this.orders) {
            console.log(
                `#${order.id} | ${order.customer} | ` +
                `$${order.total.toFixed(2)} | ${order.status}`
            );
        }

        console.log("");
        console.log(`Orders: ${this.orders.length}`);
        console.log(`Revenue: $${this.getRevenue().toFixed(2)}`);
    }
}

const manager = new OrderManager();

manager.addOrder({
    id: 1001,
    customer: "Alex Johnson",
    items: ["Laptop", "Mouse"],
    total: 1299.99,
    status: "completed"
});

manager.addOrder({
    id: 1002,
    customer: "Sarah Miller",
    items: ["Keyboard", "Headset"],
    total: 189.99,
    status: "processing"
});

manager.addOrder({
    id: 1003,
    customer: "Michael Brown",
    items: ["Monitor"],
    total: 349.99,
    status: "pending"
});

manager.addOrder({
    id: 1004,
    customer: "Emma Wilson",
    items: ["Webcam", "Microphone"],
    total: 219.99,
    status: "completed"
});

manager.updateStatus(1002, "completed");

manager.showReport();