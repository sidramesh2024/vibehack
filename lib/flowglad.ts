
// Mock FlowGlad configuration for Brooklyn Creative Hub
// In production, this would be properly configured with FlowGlad
export const flowgladServer = {
  // Mock implementation for development
  createCheckoutSession: async () => ({ url: '/billing' }),
  getCustomer: async () => null,
}
