import { forwardRef, Module } from '@nestjs/common';
import { AddressServices } from './address.service';
import { AddressController } from './address.controller';
import { ContactModule } from 'src/contact/contact.module';

@Module({
  imports: [forwardRef(() => ContactModule)],
  providers: [AddressServices],
  controllers: [AddressController],
})
export class AddressModule {}
