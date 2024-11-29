### Utilizing forwardRefs and useImperativeHandle 

In a performant React application, it is important to minimize the number of renders. This is especially true when dealing with components that are expensive to render. Here, I explored how to use the `forwardRef` and `useImperativeHandle` in multiple child components to minimize the number of renders.