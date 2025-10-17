# Prompt

Create the form that collects this data:

```typescript
interface ServiceData {
  title: string;
  subtitle: string;
  description: string;
  image: Image;
  availableFrom: Date | null;
  pet: string; // dropdown
  serviceType?: string; // radio
  isRecurring: boolean; // switch
  phone: string;
}
```

interface Image is in #image.ts

Implement it in the same way as # GenericForm is done.
Mandatory properties in the interface ServiceData should be required in the ServiceForm, and optional properties should be optional in the form.
