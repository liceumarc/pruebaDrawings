# Figuras del dibujo

Esta aplicación permite crear figuras en un canvas de **800 × 600 píxeles**. Al elegir un tipo y hacer clic, el punto del clic se guarda como el **centro** de la figura. Cada figura se puede representar como un objeto Java y todas juntas se pueden guardar en una `List<Figura>`.

## Datos de cada figura

Todas las figuras tienen estos datos:

| Propiedad | Tipo recomendado en Java | Obligatorio | Significado |
|---|---|---:|---|
| `id` | `UUID` | Sí | Identificador único de la figura. |
| `tipo` | `TipoFigura` | Sí | Tipo de figura: `CIRCULO`, `CUADRADO`, `TRIANGULO`, `RECTANGULO` o `ESTRELLA_7`. |
| `nombre` | `String` | No | Nombre que se muestra en la lista. Si no se indica, la aplicación genera uno, por ejemplo `cercle 1`. |
| `color` | `String` | Sí | Color hexadecimal, por ejemplo `#ff0000`. |
| `x` | `double` | Sí | Coordenada horizontal del centro, en píxeles. |
| `y` | `double` | Sí | Coordenada vertical del centro, en píxeles. |

El origen del canvas está en la esquina superior izquierda: `x` aumenta hacia la derecha y `y` hacia abajo. Las coordenadas pueden tener decimales. No se fuerza que el centro esté dentro del canvas.

## Datos específicos por tipo

Las medidas son números positivos en píxeles (mínimo `1`):

| Tipo (`tipo`) | Propiedades adicionales | Valores iniciales |
|---|---|---|
| `CIRCULO` | `radio: double` | `50` |
| `CUADRADO` | `lado: double` | `100` |
| `TRIANGULO` | `base: double`, `altura: double` | `100`, `100` |
| `RECTANGULO` | `ancho: double`, `altura: double` | `120`, `80` |
| `ESTRELLA_7` | `radio: double` | `60` |

En el código JavaScript, las claves correspondientes son `radius`, `side`, `base`, `height` y `width`. En Java puedes usar nombres en español como `radio`, `lado`, `base`, `altura` y `ancho`. El cuadrado se guarda como `side` en la definición activa; no uses `size` del antiguo `index.js`.

## Una forma de empezar en Java

Una clase base guarda los datos comunes. Cada subclase añade solo las medidas que necesita:

```java
import java.util.UUID;

enum TipoFigura {
    CIRCULO, CUADRADO, TRIANGULO, RECTANGULO, ESTRELLA_7
}

abstract class Figura {
    private final UUID id;
    private String nombre;
    private String color;
    private double x;
    private double y;

    protected Figura(String nombre, String color, double x, double y) {
        this.id = UUID.randomUUID();
        this.nombre = nombre;
        this.color = color;
        this.x = x;
        this.y = y;
    }

    public UUID getId() { return id; }
    public String getNombre() { return nombre; }
    public String getColor() { return color; }
    public double getX() { return x; }
    public double getY() { return y; }
    public abstract TipoFigura getTipo();
}

class Circulo extends Figura {
    private final double radio;

    public Circulo(String nombre, String color, double x, double y, double radio) {
        super(nombre, color, x, y);
        if (radio < 1) throw new IllegalArgumentException("El radio debe ser al menos 1");
        this.radio = radio;
    }

    public double getRadio() { return radio; }
    @Override public TipoFigura getTipo() { return TipoFigura.CIRCULO; }
}
```

Puedes crear clases análogas (`Cuadrado`, `Triangulo`, `Rectangulo`, `Estrella7`) con sus medidas. Luego guarda cualquier figura en la misma lista:

```java
import java.util.ArrayList;
import java.util.List;

List<Figura> figuras = new ArrayList<>();
figuras.add(new Circulo("Círculo 1", "#ff0000", 200, 150, 50));
```

Así la lista conserva el tipo concreto de cada objeto, junto con sus propiedades. Valida en los constructores que las medidas sean positivas. `nombre` puede quedar vacío y asignarse automáticamente; `id` no debería cambiar al editar una figura.

## Qué no hace falta guardar

El grosor y color del contorno, el resaltado de selección y los puntos calculados para dibujar polígonos son detalles de presentación. No forman parte de los datos editables de la figura en esta aplicación. El estado de selección tampoco hace falta guardarlo en la lista de objetos.
