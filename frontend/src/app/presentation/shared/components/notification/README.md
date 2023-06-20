# Notification

## Import

```
import { NotificationData, NotificationService } from '@components/notification';
```

## Example

```
constructor(
    private notificationService: NotificationService
) {}

showNotification() {
        const notification: NotificationData = {
            type: 'success',
            title: 'Éxito',
            text: 'Esta es una notificación de éxito',
        };
        this.notificationService.show(notification);
    }
```

## API

| Propiedad | Tipo     | Descripción                                               | Opciones                                    |
|-----------|----------|-----------------------------------------------------------|---------------------------------------------|
| type      | `string` | Establece el contexto de la notificación con los colores: | `'info' / 'success' / 'danger' / 'warning'` |
| title     | `string` |                                                           |                                             |
| text      | `string` |                                                           |                                             |
