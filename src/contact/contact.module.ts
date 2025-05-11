import { forwardRef, Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { AddressModule } from 'src/address/address.module';

@Module({
  imports: [forwardRef(() => AddressModule)],
  exports: [ContactService],
  providers: [ContactService],
  controllers: [ContactController],
})
export class ContactModule {}
