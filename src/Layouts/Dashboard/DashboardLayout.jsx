import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AppSidebar from './appSidebar';

const DashboardLayout = ({ children }) => {
   return (
      <div className="border-2 ">
         <SidebarProvider className={'max-w-7xl mx-au'}>
            <AppSidebar />
            <main className="border-2 border-green-300">
               <SidebarTrigger />
               {children}
               <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Eligendi eum dignissimos omnis, similique laborum nemo, nihil
                  voluptate sit magnam ex impedit officiis magni voluptatum
                  earum veritatis eius. Ducimus atque, sapiente mollitia,
                  deleniti perspiciatis similique non culpa at est unde
                  repellendus saepe laboriosam molestiae ipsam id. Eum nisi
                  vitae soluta minima voluptatem, necessitatibus impedit
                  repudiandae sequi, eos voluptatum doloribus voluptates eveniet
                  unde optio odio, sit magnam facilis suscipit nesciunt tenetur
                  ad. Ipsam fuga laboriosam sit dignissimos quaerat illum
                  doloremque ullam possimus quibusdam iste odio atque esse
                  debitis, reprehenderit iusto ad aut ducimus! Aliquid placeat
                  deserunt at nulla obcaecati aperiam nesciunt debitis? Lorem
                  ipsum dolor sit amet consectetur adipisicing elit. Amet sunt
                  minus, velit, voluptas natus ipsa maxime similique libero
                  officia dolores pariatur? Cupiditate, maiores alias,
                  temporibus nesciunt tempora iste aliquid ab rerum beatae
                  molestias suscipit optio at sequi ducimus ex vero. Provident
                  odio in adipisci! Velit provident qui voluptatibus molestias
                  earum iure quaerat fugiat recusandae nihil porro est sit odio
                  odit ab quis dolorum harum repellendus similique temporibus,
                  quisquam culpa assumenda consectetur. Quas rem voluptates
                  consectetur ex. A sapiente perspiciatis quas expedita mollitia
                  tenetur, hic cum necessitatibus accusantium odio unde
                  asperiores atque tempora qui! Modi laboriosam sapiente quod,
                  officia dicta sequi?
               </p>
            </main>
         </SidebarProvider>
      </div>
   );
};

export default DashboardLayout;
