import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/index';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({ type: UserDto })
  @Post()
  create(@Body() userDto: UserDto) {
    return this.usersService.create(userDto);
  }

  @ApiOkResponse({ type: UserDto })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOkResponse({ type: UserDto })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ApiOkResponse({ type: UserDto })
  @Put(':id')
  update(@Param('id') id: string, @Body() userDto: UserDto) {
    return this.usersService.update(id, userDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
