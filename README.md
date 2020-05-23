
*[Back to the main page](../README.md)*


En este repositorio se encuentra todo el desarrollo realizado en mi TFG. En concreto, el resultado final
de cada Sprint y la versión definitiva de mi proyecto. El primer Sprint fue una  primera toma de contacto
con la tecnologías a usar, el cual se encuentra en Scene-House. Se trata de un juego muy sencillo.
En la dirección ./Exercises/Final se encuentra todo aquello relacionado con la versión final. De hecho,
hay dos versiones finales. Una de ellas es para PC y la otra para las Oculus Quest. La versión para PC se
encuentra en ./Exercises/Final/exercise9 y la versión para las Oculus Quest se encuentra en
./Exercises/Final/exercise9-oculus. En ambas encontraremos un archivo JavaScript y un HTML. En los archivos
JavaScript están desarrollados los componentes y en el HTML se ha definido la estructura del proyecto.
Además, en la dirección ./Exercises/Final se encuentran dos directorios más. Uno utiliza solo móviles y
drones; y el otro es el del IDE. Esto se hizo para que se pudiera apreciar la independencia de unos módulos
y de otros.

La interfaz tiene dos modos de uso:

1. El primero es mediante un ordenador ejecutándolo en el navegador. Con el ratón se mueve la cámara
e interactuamos con los botones haciendo click, y con las flechas se mueve el usuario. Para ejecutar la versión
VR haga uso del siguiente enlace:
	https://alvarolopezgarcia.github.io/a-frame-pruebas/Exercises/Final/exercise9-oculus/exercise-9.html

2. El segundo es mediante las gafas VR y los mandos ejecuntándolo en el navegador. Con las gafas movemos la
cámara y con los mandos usamos un puntero láser. Apuntamos a un objetivo y hacemos click en el mando derecho
para interactuar con los botones de la escena. El desplazamiento en este caso se puede realizar o
desplazándote tú físicamente o haciendo uso del joystick del mando. Para ejecutar la versión VR haga uso del
siguiente enlace:
	https://alvarolopezgarcia.github.io/a-frame-pruebas/Exercises/Final/exercise9/exercise-9.html
	

Con respecto a los componentes, unos trabajan sobre la estructura de móviles, otros que trabajan en la estructura
de programas y otros que en ambos. Utilizamos una serie de componentes que son los siguientes:

1. Componentes usados para el menú del IDE:

    - programming-environment: este componente se encargará de inicializar todas las entidades referentes al IDE y
	al primer programa. Además, se encargará de asociar determinados componentes a entidades o nodos hijos para que
	generen toda la estructura inicial en el DOM. Por tanto, todo lo referente a los programas y a las instrucciones
	quedarán como nodos hijos de dicha entidad.
	
    - ide-menu: este componente se encargará de crear todos los elementos visibles del IDE (el botón y
	el panel) y la entidad que contendrá todos los programas que se generen a lo largo de la interacción.
		
    - programs: es el componente encargado de insertar en el DOM las texturas e iconos a usar por los programas y el
	primer programa. 
		
    - button:
		

2. Componentes usados para cada programa:
	
    - program: este componente crea toda la estructura de un programa y la inserta en el DOM.
	
    - program-menu: este componente crea e inserta en el DOM el panel del programa y el texto.
    
	- program-buttons: este componente crea todos los botones que tiene un menú de programa e inserta en el DOM las
	texturas correspondientes a sus botones.
    
	- instructions: este componente únicamente indica la entidad que engloba todas las instrucciones del programa.
    
	- instruction: este componente mueve el dron en una dirección en función del tipo de instrucción que sea.
	
	- button
	
3. Componentes usados para el menú de móviles:

    - mobiles-environment: este componente se encargará de inicializar todo aquello referente al menú de móviles,
	al menú del primer móvil y al primer dron. Además, se encargará de asociar determinados componentes a entidades
	o nodos hijos para que generen toda la estructura inicial en el DOM.

    - mobiles-menu: este componente crea toda la estructura del menú de móviles.

    - button

4. Componentes usados para cada móvil (menú y dron):

    - mobile: este componente se encargará de inicializar todo aquello referente al menú del móvil e insertar el
	dron en la escena. Además de ejecutar todas las instrucciones del programa que tenga asignado el dron.

    - mobile-menu: este componente se encargará de crear el menú del móvil.

    - mobile-buttons: este componente se encargará de crear los botones del menú del móvil y de insertar las texturas
	a usar en los assets del DOM.

    - button

En cuanto al componente button, se usa varias veces debido a que todos los botones usan dicho componente sea la función
que tenga el botón. Este componente se encarga dar una funcionalidad específica a cada botón.

Para más detalles visite mi sitio web:
	https://alvarolopezgarcia.github.io/Proyecto_Aframe_TFG/